import { Request, Response } from 'express';

import { Logs } from '../models/entities/Logs';
import { VideoCalling } from '../models/entities/VideoCalling';
import { CampaignStoreRepository } from '../repositories/CampaignStore.repository';
import { LogsRepository } from '../repositories/Logs.repository';
import { VideoCallingRepository } from '../repositories/VideoCalling.repository';
import { BaseController } from './Base.controller';

class LogController extends BaseController<Logs, LogsRepository> {

    videoCallingRepository: VideoCallingRepository;
    campaignStoreRepostiroy: CampaignStoreRepository;

    constructor() {
        super(Logs, '/vs/logs');
        this.videoCallingRepository = new VideoCallingRepository();
        this.campaignStoreRepostiroy = new CampaignStoreRepository();
    }

    initRepository() {
        return new LogsRepository();
    }

    customRoutes() {
        this.router.post(this.path + '/video_calling', (req, res) => this.logVideoCalling(req, res));
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
            console.log('log recorded', request.body);
            const accountName = await this.findUsernameInRequest(request);
            const log = new Logs();
            log.storeId = request.body.storeId;
            log.customerId = request.body.customerId;
            log.tappedNodeId = request.body.nodeId;
            log.createdBy = accountName;
            log.updatedBy = accountName;
            const result = await this.repository.insert(log);
            const logId = result.generatedMaps[0].id;

            const entity = await this.repository.findOneById(logId);
            return response.status(200).json(entity);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
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
            const log = await this.repository.findOneById(request.body?.logId);
            if (!log) {
                console.log('submitting log not found', request.body);
                return response.status(404).json({ message: 'Log is not found' });
            }
            const accountName = await this.findUsernameInRequest(request);
            const isStartVideo = request.body.value === 'start';

            if (isStartVideo) {
                const tabletAccount = await this.findTabletByAccount(accountName);
                if (!tabletAccount) {
                    console.log('submitting log video call not found account ', accountName);
                    return response.status(500).json({
                        message: 'Account is not found',
                        err_code: this.errCode.ERROR_RESPONSE
                    });
                }
                const record = new VideoCalling();
                record.accountId = tabletAccount.id;
                record.campaignId = request.body.campaignId;
                record.storeId = request.body.storeId;
                record.salespersonId = request.body.salePersonId;
                record.startedAt = new Date();

                record.createdBy = tabletAccount.account;
                record.updatedBy = tabletAccount.account;
                result = await this.videoCallingRepository.insert(record);
                log.videoCallingId = result.generatedMaps[0].id;
                await this.repository.update(log.id, log);
            } else {
                const record = await this.videoCallingRepository.findOneById(log.videoCallingId);
                if (!record) {
                    return response.status(404).json({ message: 'Previous VideoCalling log is not found' });
                }
                record.stoppedAt = new Date();
                result = await this.videoCallingRepository.update(record.id, record);
                logId = record.id;
            }
            return response.status(200).json('OK');
        } catch (error) {
            console.log(error);
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
        }

    }

    async find(request: Request, response: Response): Promise<Response<any>> {
        return response.status(500).json({ status: 'error', message: 'Not supported', err_code: this.errCode.ERROR_RESPONSE });
    }

    async findOne(request: Request, response: Response): Promise<Response<any>> {
        return response.status(500).json({ status: 'error', message: 'Not supported', err_code: this.errCode.ERROR_RESPONSE });
    }

    async paginate(request: Request, response: Response): Promise<Response<any>> {
        return response.status(500).json({ status: 'error', message: 'Not supported', err_code: this.errCode.ERROR_RESPONSE });
    }

    async delete(request: Request, response: Response): Promise<Response<any>> {
        return response.status(500).json({ status: 'error', message: 'Not supported', err_code: this.errCode.ERROR_RESPONSE });
    }

    async update(request: Request, response: Response): Promise<Response<any>> {
        return response.status(500).json({ status: 'error', message: 'Not supported', err_code: this.errCode.ERROR_RESPONSE });
    }
}

export default LogController
