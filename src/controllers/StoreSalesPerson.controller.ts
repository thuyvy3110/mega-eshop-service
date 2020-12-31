import { Request, Response } from 'express'
import { StoreSalespersons } from '../models/entities/StoreSalespersons'
import { StoreSalespersonsRepository } from '../repositories/StoreSalesPerson.repository'
import { BaseController } from './Base.controller'

class StoreSalespersonsController extends BaseController<StoreSalespersons, StoreSalespersonsRepository> {

    constructor() {
        super(StoreSalespersons, '/vs/store-and-salesperson')
    }

    initRepository() {
        return new StoreSalespersonsRepository()
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
                })
            return response.status(200).json({ message: 'Record deleted' })
        } catch (error) {
            console.log(error)
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
        }
    }

    find = async (request: Request, response: Response) => {
        const client: any = await this.findClientObject(request)
        try {
            console.log('BaseController - find: ' + request)
            const records = await this.repository.findByClientId(
                client.parentClientId == 0 ? client.id : client.parentClientId
            )
            return response.status(200).json(records)
        } catch (error) {
            console.log(error)
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
        }
    }

    async findOne(request: Request, response: Response): Promise<Response<any>> {
        const client: any = await this.findClientObject(request)
        try {
            console.log('StoreSalespersonsController - findOne: ' + request)
            const records = await this.repository.getDataByIdOfRowTable(Number(request.params.id));
            return response.status(200).json(records)
        } catch (error) {
            console.log(error)
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
        }
    }

    getActiveSalePerson = async (request: Request, response: Response) => {
        try {
            const storeId = Number(request.params.id)
            const id: any = await this.findParentClientIdFirst(request)
            const record = await this.repository.findActiveSalePersonInStore(storeId,id)

            return response.status(200).json(record)
        } catch (error) {
            console.log(error)
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
        }
    }

    getInActiveSalePerson = async (request: Request, response: Response) => {
        try {
            const storeId = Number(request.params.id)
            const id: any = await this.findParentClientIdFirst(request)
            const record = await this.repository.findInActiveSalePersonInStore(storeId, id)

            return response.status(200).json(record)
        } catch (error) {
            console.log(error)
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
        }
    }

    async create(request: Request, response: Response): Promise<Response<any>> {
        return this.save(request, response)
    }

    update = async (request: Request, response: Response): Promise<Response<any>> => {
        return this.save(request, response)
    }

    save = async (request: Request, response: Response) => {
        try {
            const author = await this.findUsernameInRequest(request)

            let salespersonId, storeId;
            for(let i = 0; i < request.body.length; i++) {
                if (request.body[i].salespersonIds) {
                    salespersonId = request.body[i].salespersonIds;
                } else if (request.body[i].storeId){
                    storeId = request.body[i].storeId;
                }
            }

            const salesPersonIdsToAdd: number[] = salespersonId
            await this.repository.addSalePersonToStore(storeId, salesPersonIdsToAdd, author)

            return response.status(200).json('ok')
        } catch (error) {
            console.log(error)
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
        }
    }
}

export default StoreSalespersonsController