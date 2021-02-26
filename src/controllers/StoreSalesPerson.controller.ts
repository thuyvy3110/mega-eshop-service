import { Request, Response } from 'express';
import _ from 'lodash';
import { getRepository } from 'typeorm';

import { SalePerson } from '../models/entities/Salespersons';
import { Stores } from '../models/entities/Stores';
import { StoreSalespersons } from '../models/entities/StoreSalespersons';
import { StoreSalespersonsRepository } from '../repositories/StoreSalesPerson.repository';
import { BaseController } from './Base.controller';

class StoreSalespersonsController extends BaseController<StoreSalespersons, StoreSalespersonsRepository> {

    constructor() {
        super(StoreSalespersons, '/vs/store-and-salesperson');
    }

    initRepository() {
        return new StoreSalespersonsRepository();
    }

    customRoutes() {
        this.router.get(this.path + '/:id/salesperson/active', (req: Request, res: Response) => this.getActiveSalePerson(req, res))
        this.router.get(this.path + '/:id/salesperson/inactive', (req: Request, res: Response) => this.getInActiveSalePerson(req, res))
    }

    async delete(request: Request, response: Response): Promise<Response> {
        try {
            console.log('StoreSalespersonsController - delete by store Id: ' + request.params.id)
            request.params.id
                .split(',')
                .map(async (id: string) => {
                    await this.repository.deleteByStoreId(Number(id))
                });
            return response.status(200).json({ message: 'Record deleted' })
        } catch (error) {
            console.log(error)
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
        }
    }

    find = async (request: Request, response: Response) => {
        const clientId: any = await this.findParentClientIdFirst(request);
        try {
            console.log('BaseController - find: ' + request);
            const records = await this.repository.findByClientId(clientId);
            return response.status(200).json(records);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
        }
    }

    async paginate(request: Request, response: Response) {
        const clientId: any = await this.findParentClientIdFirst(request);
        try {
            if (_.isEmpty(request.query)) {
                return response.status(400).json({ message: 'Bad Request' });
            }
            console.log('Paginate params: ', request.query);
            const entities = await getRepository(Stores)
                .createQueryBuilder('store')
                .innerJoinAndSelect('store.storeSalespersons', 'storeSalespersons')
                .innerJoinAndSelect('storeSalespersons.salesperson', 'salesperson')
                .where('store.client_id = :clientId', { clientId })
                .orderBy('store.updatedAt', 'DESC')
                .paginate();
            if (!_.isEmpty(entities)) {
                const newData: Array<StoreSalespersons> = [];
                for (const entity of entities.data) {
                    const ssp = entity.storeSalespersons[0];

                    ssp.store = new Stores();
                    ssp.store.id = entity.id;
                    ssp.store.storeName = entity.storeName;
                    ssp.store.officer = entity.officer;
                    
                    const salespersons = entity.storeSalespersons?.map((x: StoreSalespersons) => x.salesperson);
                    ssp.salespersons = salespersons;

                    newData.push(ssp);
                }
                entities.data = newData;
            }
            return response.status(200).json(entities);
        } catch (error) {
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
        }
    }

    async findOne(request: Request, response: Response): Promise<Response<any>> {
        try {
            console.log('StoreSalespersonsController - findOne: ' + request)
            const records = await this.repository.getDataByIdOfRowTable(Number(request.params.id));
            return response.status(200).json(records);
        } catch (error) {
            console.log(error)
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
        }
    }

    getActiveSalePerson = async (request: Request, response: Response) => {
        try {
            const storeId = Number(request.params.id);
            const id: any = await this.findParentClientIdFirst(request);
            const record = await this.repository.findActiveSalePersonInStore(storeId, id);

            return response.status(200).json(record);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
        }
    }

    getInActiveSalePerson = async (request: Request, response: Response) => {
        try {
            const storeId = Number(request.params.id);
            const id: any = await this.findParentClientIdFirst(request);
            const record = await this.repository.findInActiveSalePersonInStore(storeId, id);

            return response.status(200).json(record);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
        }
    }

    async create(request: Request, response: Response): Promise<Response<any>> {
        return this.save(request, response);
    }

    update = async (request: Request, response: Response): Promise<Response<any>> => {
        return this.save(request, response);
    }

    save = async (request: Request, response: Response) => {
        try {
            const author = await this.findUsernameInRequest(request);

            let salespersonId, storeId;

            for (let i = 0; i < request.body.length; i++) {
                if (request.body[i].salespersonIds) {
                    salespersonId = request.body[i].salespersonIds;
                }
                if (request.body[i].storeId) {
                    storeId = request.body[i].storeId;
                }
            }

            const salesPersonIdsToAdd: number[] = salespersonId;
            await this.repository.addSalePersonToStore(storeId, salesPersonIdsToAdd, author);

            return response.status(200).json('ok');
        } catch (error) {
            console.log(error);
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
        }
    }
}

export default StoreSalespersonsController;