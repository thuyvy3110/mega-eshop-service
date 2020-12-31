import { Categories } from '../models/entities/Categories'
import { BaseRepository } from './BaseRepository.repository'

export class CategoriesRepository extends BaseRepository<Categories> {
    constructor() {
        super(Categories)
    }

    public async getTypeCampaign(clientId: any) {
        return await this.getType(clientId, 'campaign');
    }

    public async getTypeScenario(clientId: any) {
        return await this.getType(clientId, 'scenario');
    }

    public async getTypeProduct(clientId: any) {
        return await this.getType(clientId, 'product');
    }

    public async getType(clientId: any, type: string) {
        return await this.repository.find({
            where: {
                'clientId': clientId,
                'categoryType': type
            }
        })
    }
}