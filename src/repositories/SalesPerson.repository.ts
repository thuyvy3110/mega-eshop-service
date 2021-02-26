import { SalePerson } from '../models/entities/Salespersons'
import { BaseRepository } from './BaseRepository.repository'
import jwt_decode from 'jwt-decode'
import { getRepository } from 'typeorm'

export class SalespersonRepository extends BaseRepository<SalePerson> {

    constructor() {
        super(SalePerson)
    }

    public async getUserInfoByJwt(token: any) {
        const execData: any = jwt_decode(token)
        const cognitoName = execData['username']
        let arrStore: any = [];

        const data = await getRepository(SalePerson)
            .createQueryBuilder('sp')
            .leftJoinAndSelect('store_salespersons', 'ss', 'ss.salespersonId = sp.id')
            .leftJoinAndSelect('ss.store', 'stores')
            .leftJoinAndSelect('stores.client', 'clients')
            .leftJoinAndSelect('clients.languageType2', 'languages')
            .where('account = :name', { name: cognitoName })
            .getRawMany();

        if (data.length > 0) data.forEach(item => arrStore.push(item.stores_id))

        return {
            store: {
                storeId: arrStore
            },
            client: {
                clientId: data[0]?.['clients_id'],
                clientName: data[0]?.['clients_name']
            },
            salePerson: {
                id: data[0]?.['sp_id'],
                account: cognitoName,
                name: data[0]?.['sp_name']
            },
            language: data[0]?.['languages_language']
        }
    }

    public async findByAccount(account: string) {
        return this.repository.findOne({ account: account })
    }

    public async getSalespersonByClientId(clientId: number) {
        return this.repository
            .createQueryBuilder('salespersons')
            .where('salespersons.client_id = :client_id ')
            .setParameter('client_id', clientId)
            .getMany()
    }
}