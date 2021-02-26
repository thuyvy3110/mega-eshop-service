import {Request, Response} from 'express';
import _ from 'lodash';
import {Campaigns} from '../models/entities/Campaigns';
import {CampaignRepository} from '../repositories/Campaign.repository';
import { ProductRepository } from '../repositories/Product.repository'
import { StoreRepository } from '../repositories/Store.repository'
import { CategoriesRepository } from '../repositories/Categories.repository'
import { CampaignStoreRepository } from '../repositories/CampaignStore.repository'
import { CampaignProductRepository } from '../repositories/CampaignProduct.repository'
import { BaseController } from './Base.controller'
import { body, validationResult } from 'express-validator'
import { getFileFromS3 } from '../utils/Storage.utils'

export const campaignStatus = {
    active: '1',
    inactive: '0'
}

// Only handle request
class CampaignController extends BaseController<Campaigns, CampaignRepository> {

    private campaignStoreRepository: CampaignStoreRepository
    private campaignProductRepository: CampaignProductRepository
    private productRepository: ProductRepository
    private storeRepository: StoreRepository
    private categoriesRepository: CategoriesRepository

    constructor () {
        super(Campaigns, '/vs/campaigns');
        this.campaignStoreRepository = new CampaignStoreRepository()
        this.campaignProductRepository = new CampaignProductRepository()
        this.productRepository = new ProductRepository()
        this.storeRepository = new StoreRepository()
        this.categoriesRepository = new CategoriesRepository()
    }

    initRepository() {
        return new CampaignRepository()
    }

    customRoutes() {
        // update status
        this.router.put(
            this.path + '/status',
            [
                body('id').notEmpty().isString(),
                body('status').notEmpty().isString()
            ],
            (req: Request, res: Response) => this.updateStatus(req, res)
        );
        // update campaign
        this.router.put(
            this.path,
            [
                body('id').notEmpty().isString(),
                body('campaignName').notEmpty().isString().isLength({ max: 100 }),
                body('categoryId').notEmpty().isString(),
                body('status').notEmpty().isString(),
                body('startDate').notEmpty().isString(),
                body('endDate')
                    .notEmpty()
                    .isString()
                    .custom((value, { req }) => value > req.body.startDate),
                body('productIds').notEmpty(),
                body('storeIds'),
                body('url').notEmpty().isString().isLength({ max: 200 }),
            ],
            (req: any, res: Response) => this.save(req, res)
        );
        // create campaign
        this.router.post(
            this.path,
            [
                body('campaignName').notEmpty().isString().isLength({ max: 100 }),
                body('categoryId').notEmpty().isString(),
                body('status').notEmpty().isString(),
                body('startDate').notEmpty().isString(),
                body('endDate')
                    .notEmpty()
                    .isString()
                    .custom((value, { req }) => value > req.body.startDate),
                body('productIds').notEmpty(),
                body('url').notEmpty().isString().isLength({ max: 200 }),
            ],
            (req: any, res: Response) => this.save(req, res)
        );
        // get categories
        this.router.get(this.path+'/categories', (req: Request, res: Response) => this.getAllCategories(req, res));
        // get by id
        this.router.get(this.path+'/:id', (req: Request, res: Response) => this.findById(req, res));
        // get list
        this.router.get(this.path + '/:clientId/list', (req: Request, res: Response) => this.getAll(req, res));

    }

    // Save
    save = async (request: any, response:Response) => {
        const clientId: any = await this.findClientId(request);
        const account = await this.findUsernameInRequest(request);
        const errors = validationResult(request);
        let storeIds = request.body.storeIds;

        const isActive = request.body.status === campaignStatus.active;

        if (isActive && _.isEmpty(storeIds)) {
            return response.status(500).json({ err_code: this.errCode.ERROR_MISSING_STORE_ID });
        }

        if (!errors.isEmpty()) {
            return response.status(500).json({ err_code: this.errCode.ERROR_VALIDATION });
        }

        if (storeIds) {
            storeIds = storeIds.split(',')
        }
        const productIds = request.body.productIds.split(',')
        try {
            const isNew = Number(request.body.id)  > 0 ? false : true;
            let record: Campaigns;
            if (isNew) {
                record = new Campaigns();
                record.createdBy = account;
                record.updatedBy = account;
            } else {
                //@ts-ignore
                record = await this.repository.findOneById(request.body.id);
                if (!record) {
                    return response.status(404).json({ message: 'Campaign not found' });
                }
                record.updatedBy = account;
            }
            record.campaignName = request.body.campaignName;
            record.categoryId = request.body.categoryId;
            record.clientId = clientId;
            record.content = request.body.content;
            record.url = request.body.url;
            record.status = request.body.status || campaignStatus.inactive;
            record.startDate = request.body.startDate;
            record.endDate = request.body.endDate;
            record.goods = request.body.goods;
            record.periods = request.body.periods;
            record.dueDate = request.body.dueDate;

            const campaign = await this.repository.upsert(record);
            if (!_.isEmpty(productIds)) {
                await this.campaignProductRepository.delete(campaign.id);
                await this.campaignProductRepository.save(campaign.id, productIds, account);
            }
            if (request.body.status === campaignStatus.active) {
                await this.campaignStoreRepository.delete(campaign.id);
                await this.campaignStoreRepository.save(campaign.id, storeIds, account);
            }
            await this.uploadHandler(campaign, request, 'image1', 'campaign_' + campaign.id + '_image1', request.body.image1);
            await this.uploadHandler(campaign, request, 'image2', 'campaign_' + campaign.id + '_image2', request.body.image2);
            await this.uploadHandler(campaign, request, 'image3', 'campaign_' + campaign.id + '_image3', request.body.image3);
            await this.uploadHandler(campaign, request, 'image4', 'campaign_' + campaign.id + '_image4', request.body.image4);
            await this.uploadHandler(campaign, request, 'image5', 'campaign_' + campaign.id + '_image5', request.body.image5);
            await this.repository.upsert(campaign);

            return response.status(200).json({status: 'success', message: 'Success'});
        } catch(error) {
            console.log(error);
            return response.status(500).json({status: 'error', err_code: this.errCode.ERROR_RESPONSE});
        }
    }

    async uploadHandler(record: Campaigns, req: any, field: string, key: string, defaultValue: string) {
        if (req.files && req.files[field]) {
            const uploadResult = await this.upload(req, field, key);
            this.assignProperty(record, field, uploadResult);
        } else {
            this.assignProperty(record, field, defaultValue);
        }
    }

    // Get
    getAll = async (request: Request, response: Response) => {
        const clientId: any = await this.findClientId(request);
        try {
            if(request.query?.types === 'active'){
                const campaigns = await this.repository.getStatusActiveList(clientId)
                return response.status(200).json({types: 'active', data: campaigns});
            }
            if(request.query?.types === 'inactive'){
                const campaigns = await this.repository.getStatusInActiveList(clientId)
                return response.status(200).json({types: 'inactive', data: campaigns});
            }
            const campaignsInactive = await this.repository.getStatusInActiveList(clientId)
            const campaignsActive = await this.repository.getStatusActiveList(clientId)
            return response.status(200).json({types: 'all', campaignsActive, campaignsInactive});
        } catch(error) {
            console.log(error);
            return response.status(500).json({err_code: this.errCode.ERROR_RESPONSE});
        }
    }

    // Get One
    findById = async (request: Request, response: Response) => {
        try {
            const campaign = await this.repository.getOne(request.params)
            if (_.isEmpty(campaign)) {
                return response.status(404).json({message: 'No Data'});
            }
            if (request.query?.type == 'public') {
                // @ts-ignore
                campaign.image1 = await getFileFromS3(campaign.image1);
                // @ts-ignore
                campaign.image2 = await getFileFromS3(campaign.image2);
                // @ts-ignore
                campaign.image3 = await getFileFromS3(campaign.image3);
                // @ts-ignore
                campaign.image4 = await getFileFromS3(campaign.image4);
                // @ts-ignore
                campaign.image5 = await getFileFromS3(campaign.image5);
            }
            return response.status(200).json(campaign);
        } catch(error) {
            console.log(error)
            return response.status(500).json({err_code: this.errCode.ERROR_RESPONSE});
        }
    }

    // Update status
    updateStatus = async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(500).json({ err_code: this.errCode.ERROR_VALIDATION });
        }

        const id = request.body.id;
        const status = request.body.status;
        const campaign = await this.repository.findOneById(id);
        if(!_.isEmpty(campaign)){
            try {
                await this.repository.updateStatus({ id, status });
                if (status === campaignStatus.inactive) {
                    await this.campaignStoreRepository.delete(id);
                }
                return response.status(200).json({status: 'success', message: 'Success'});
            } catch(error) {
                console.log(error)
                return response.status(500).json({err_code: this.errCode.ERROR_RESPONSE});
            }
        }

        return response.status(400).json({message: 'Bad Request'});
    }

    // Get category
    getAllCategories = async(request: Request, response: Response) => {
        const clientId: any = await this.findClientId(request);
        try {
            const storeAll = await this.storeRepository.getAll(clientId)
            const storeList = await this.storeRepository.getById(clientId)
            const productList = await this.productRepository.get(clientId)
            const categories = await this.categoriesRepository.getTypeCampaign(clientId)
            return response.status(200).json({storeAll, storeList, productList, categories});
        } catch(error) {
            console.log(error)
            return response.status(500).json({err_code: this.errCode.ERROR_RESPONSE});
        }
    }

}
export default CampaignController;