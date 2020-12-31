import { Request, Response } from 'express'
import { BaseController } from './Base.controller'
import { LogsRepository } from '../repositories/Logs.repository'
import { VideoCallingRepository } from '../repositories/VideoCalling.repository'
import { VideoCalling } from '../models/entities/VideoCalling'
import { Logs } from '../models/entities/Logs'
import { CampaignStoreRepository } from '../repositories/CampaignStore.repository'

class LogController extends BaseController<Logs, LogsRepository> {

    videoCallingRepository: VideoCallingRepository
    campaignStoreRepostiroy: CampaignStoreRepository

    constructor() {
        super(Logs, '/vs/logs')
        this.videoCallingRepository = new VideoCallingRepository()
        this.campaignStoreRepostiroy = new CampaignStoreRepository()
    }

    initRepository() {
        return new LogsRepository()
    }

    customRoutes() {
        this.router.post(this.path + '/init', (req, res) => this.initCustomer(req, res))
        this.router.post(this.path + '/video_calling', (req, res) => this.logVideoCalling(req, res))
    }

    /**
     * When user enter/refresh the tablet page, we create a customer ID and assigned to client.<br/>
     * body:
     * {
     *     storeId: number
     * }
     *
     * @param request
     * @param response
     */
    async initCustomer(request: Request, response: Response): Promise<Response<any>> {
        try {
            const accountName = await this.findUsernameInRequest(request)
            const lastCustomerId = await this.repository.getLastCustomerId()

            const log = new Logs()
            log.createdBy = accountName
            log.updatedBy = accountName;
            log.customerId = lastCustomerId + 1
            log.storeId = request.body.storeId
            await this.repository.insert(log)
            return response.status(200).json({"customerId": log.customerId})
        } catch (error) {
            console.log(error)
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
        }
    }

    /**
     * Record user activity on tablet, display
     * body:
     * {
     *     storeId: number,
     *     customerId: number,
     *     nodeId: number,
     * }
     * @param request
     * @param response
     */
    async create(request: Request, response: Response): Promise<Response<any>> {
        try {
            console.log('log recorded', request.body)
            const accountName = await this.findUsernameInRequest(request)
            const log = new Logs()
            log.storeId = request.body.storeId
            log.customerId = request.body.customerId
            log.tappedNodeId = request.body.nodeId
            log.createdBy = accountName
            log.updatedBy = accountName;
            const result = await this.repository.insert(log)
            const logId = result.generatedMaps[0].id

            const entity = await this.repository.findOneById(logId)
            return response.status(200).json(entity)
        } catch (error) {
            console.log(error)
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
        }
    }

    /**
     * record video call info <br/>
     * {
     *     "logId": number,
     *     "salePersonId": number,
     *     "campaignStoreId": number
     * }
     * @param request
     * @param response
     */
    async logVideoCalling(request: Request, response: Response): Promise<Response<any>> {
        let result;
        let logId = 0;
        try {
            const accountName = await this.findUsernameInRequest(request)
            const account = await this.findTabletByAccount(accountName)
            if (!account) {
                console.log('submitting log video call not found account ', accountName);
                return response.status(404).json({ message: 'Account is not found' })
            }
            const log = await this.repository.findOneById(request.body.logId);
            if (!log) {
                console.log('submitting log not found', request.body);
                return response.status(404).json({ message: 'Log is not found' })
            }

            if (request.body.value === 'start') {
                let record = new VideoCalling()
                record.accountId = account.id
                const campaignId = request.body.campaignId
                const storeId = request.body.storeId;
                const campaignStore = await this.campaignStoreRepostiroy.find({
                    where: {
                        campaignId: campaignId,
                        storeId: storeId
                    }
                    }
                )
                if (!campaignStore) {
                    return response.status(404).json({ message: 'Campaign Store is not found' })
                }
                record.campaignStoreId = campaignStore[0].id;
                record.salespersonId = request.body.salePersonId
                record.startedAt = new Date()
                record.createdBy = account.account;
                record.updatedBy = account.account;
                result = await this.videoCallingRepository.insert(record)

                log.videoCallingId = result.generatedMaps[0].id;
                await this.repository.update(log.id, log);
            } else {
                let record = await this.videoCallingRepository.findOneById(log.videoCallingId)
                if (!record) {
                    return response.status(404).json({ message: 'Previous VideoCalling log is not found' })
                }
                record.updatedBy = account.account;
                record.stoppedAt = new Date()
                result = await this.videoCallingRepository.update(record.id, record)
                logId = record.id;
            }
            return response.status(200).json('OK')
        } catch (error) {
            console.log(error)
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
        }

    }

    async find(request: Request, response: Response): Promise<Response<any>> {
        return response.status(500).json({ message: 'Not supported' })
    }

    async findOne(request: Request, response: Response): Promise<Response<any>> {
        return response.status(500).json({ message: 'Not supported' })
    }

    async paginate(request: Request, response: Response): Promise<Response<any>> {
        return response.status(500).json({ message: 'Not supported' })
    }

    async delete(request: Request, response: Response): Promise<Response<any>> {
        return response.status(500).json({ message: 'Not supported' })
    }

    async update(request: Request, response: Response): Promise<Response<any>> {
        return response.status(500).json({ message: 'Not supported' })
    }
}

export default LogController
