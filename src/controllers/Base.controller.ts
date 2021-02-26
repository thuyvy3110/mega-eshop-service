// import * as express from 'express';
import { Request, Response, Router } from 'express';
import jwt_decode from 'jwt-decode';
import _ from 'lodash';
import { EntityTarget, getRepository } from 'typeorm';

import { ErrCode } from '../lib/errCode';
import { BaseModel } from '../models/Base.models';
import { BaseAccountRepository } from '../repositories/BaseAccount.repository';
import { BaseRepository } from '../repositories/BaseRepository.repository';
import { uploadFileToS3 } from '../utils/Storage.utils';
import ControllerBase from './interfaces/ControllerBase.interface';

export abstract class BaseController<T extends BaseModel, R extends BaseRepository<T>> implements ControllerBase {
    public path: string
    public router: Router = Router()
    public repository: R
    public entity: EntityTarget<T>
    public errCode = ErrCode
    private accountRepository: BaseAccountRepository

    protected constructor(entity: EntityTarget<T>, path: string) {
        this.path = path
        this.repository = this.initRepository()
        this.customRoutes()
        this.initRoutes()
        this.entity = entity
        this.accountRepository = new BaseAccountRepository()
    }

    public initRoutes() {
        this.router.post(this.path, (req: Request, res: Response) => this.create(req, res))
        this.router.get(this.path, (req: Request, res: Response) => this.find(req, res))
        this.router.get(this.path + '/all', (req: Request, res: Response) => this.find(req, res))
        this.router.get(this.path + '/:id(\\d+)', (req: Request, res: Response) => this.findOne(req, res))
        this.router.get(this.path + '/list', (req: Request, res: Response) => this.paginate(req, res))
        this.router.delete(this.path + '/:id', (req: Request, res: Response) => this.delete(req, res))
        this.router.put(this.path + '/:id(\\d+)', (req: Request, res: Response) => this.update(req, res))
    }

    abstract customRoutes(): void;

    abstract initRepository(): R;

    protected updateRepository(repository: R) {
        this.repository = repository
    }
    public async find(request: Request, response: Response) {
        try {
            console.log('BaseController - find: ' + request);
            const record = await this.repository.find();
            return response.status(200).json(record);
        } catch (error) {
            console.log(error)
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
        }
    }

    public async findOne(request: Request, response: Response) {
        try {
            console.log('BaseController - findOne: ' + request);
            console.log('FindOne params: ', request.params.id);
            const record = await this.repository.findOneById(request.params.id);
            if (_.isEmpty(record)) {
                return response.status(404).json({ message: 'No Data' });
            }
            return response.status(200).json(record);
        } catch (error) {
            console.log(error)
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
        }
    }

    public async findAll(request: Request, response: Response) {
        try {
            const record = await this.repository.findAll()
            return response.status(200).json(record)
        } catch (error) {
            console.log(error)
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
        }
    }

    public async delete(request: Request, response: Response) {
        try {
            console.log('BaseController - delete: ' + request);
            await this.repository.delete(request.params.id);
            return response.status(200).json({ message: 'Record deleted' });
        } catch (error) {
            console.log(error)
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
        }
    }

    public async update(request: Request, response: Response) {
        try {
            console.log('BaseController - update: ' + request);
            await this.repository.update(request.params.toString(), request.body);
            return response.status(200).json({ message: 'Record updated' });
        } catch (error) {
            console.log(error)
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
        }
    }

    public async create(request: Request, response: Response) {
        try {
            console.log('BaseController - create: ' + request);
            await this.repository.insert(request.body);
            return response.status(201).json({ message: 'Record Inserted' });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
        }
    }

    public async paginate(request: Request, response: Response) {
        try {
            if (_.isEmpty(request.query)) {
                return response.status(400).json({ message: 'Bad Request' });
            }
            console.log('Paginate params: ', request.query);
            const entities = await getRepository(this.entity).createQueryBuilder().paginate();
            return response.status(200).json(entities);
        } catch (error) {
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
        }
    }

    public async parseJwtToken(request: Request) {
        const token: any = await request.get('Authorization')?.replace('Bearer ', '');
        return jwt_decode(token);
    }

    public async findUsernameInRequest(request: Request): Promise<string> {
        const execData: any = await this.parseJwtToken(request);
        const name: string = execData.username;
        return name;
    }

    public async findUserPoolName(request: Request) {
        const poolName = await request.get('poolname')
        return poolName;
    }

    public async findClientId(request: Request) {
        const account = await this.findUsernameInRequest(request)
        const poolName: any = await this.findUserPoolName(request)
        const id = await this.accountRepository.getClientId(account, poolName)
        return id;
    }

    public async findParentClientIdFirst(request: Request) {
        const client: any = await this.findClientObject(request);
        if(client) {
            return client.parentClientId == 0 ? client.id : client.parentClientId;
        }
        return -1;
    }

    public async findClientObject(request: Request) {
        const account = await this.findUsernameInRequest(request);
        const poolName: any = await this.findUserPoolName(request);
        return this.accountRepository.getClientObject(account, poolName);
    }

    public async findSalePersonByAccount(account: string) {
        return await this.accountRepository.getAccountSalesPerson(account)
    }

    public async findTabletByAccount(account: string) {
        return await this.accountRepository.getAccountTablet(account)
    }

    public async upload(request: any, fieldName: string, fileKey: string) {
        if (!request.files[fieldName]) {
            throw new Error('file not found')
        }
        const file = request.files[fieldName]
        const name = file.name

        console.log(file.tempFilePath)
        fileKey += name.substring(name.lastIndexOf('.'))

        try {
            const result = await uploadFileToS3(file.tempFilePath, fileKey)
            return result.Key
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    public assignProperty(record: any, field: string, val: any) {
        record[field] = val;
    }
}