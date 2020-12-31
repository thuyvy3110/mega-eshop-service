import { getRepository } from 'typeorm'
import { CampaignStores } from '../models/entities/CampaignStores'
import { Stores } from '../models/entities/Stores'
import { BaseRepository } from './BaseRepository.repository'
import { Campaigns } from '../models/entities/Campaigns'
import { CampaignRepository } from './Campaign.repository'
import { Scenarios } from '../models/entities/Scenarios'

export class StoreRepository extends BaseRepository<Stores> {
    private campaignRepository: CampaignRepository;

    constructor() {
        super(Stores)
        this.campaignRepository = new CampaignRepository()
    }

    public async getAll(clientId: any) {
        return this.repository
            .createQueryBuilder('stores')
            .where('stores.client_id = :client_id')
            .setParameter('client_id', clientId)
            .getMany()
    }

    public async getById(clientId: any) {
        const qb = await this.repository.createQueryBuilder()
        return this.repository
            .createQueryBuilder('stores')
            .where(`stores.client_id = :client_id AND stores.id NOT IN ${qb.subQuery()
                .select('store_id')
                .distinct(true)
                .from(CampaignStores, 'campaign_store')
                .getQuery()}`
            )
            .setParameter('client_id', clientId)
            .getMany()
    }

    private async getStoreIdByCampaignStore (clientId: number): Promise<Array<number>> {
        const storeId: Array<number> = [];
        const campaignId: Array<number> = [];
        const campaignList = await this.campaignRepository.getStatusActiveList(clientId)

        if (!campaignList) {
            return []
        }

        for (let i = 0; i < campaignList.length; ++i) {
            const { id } = campaignList[i];
            campaignId.push(id);
        }

        const data = await getRepository(CampaignStores).createQueryBuilder('campaign_stores')
        .innerJoinAndSelect(Campaigns, 'campaigns', 'campaigns.id = campaign_stores.campaign_id')
        .where(`campaign_stores.campaign_id IN (${campaignId} )`)
        .select('campaign_stores.storeId')
        .getMany()

        data.forEach((element: any) => storeId.push(element.storeId));

        return storeId
    }

    public async findScenarioFromStore(storeId: number) {
        try {
                const campaignId = await getRepository(Campaigns).createQueryBuilder('campaigns')
                .innerJoinAndSelect(CampaignStores, 'campaign_stores', 'campaigns.id = campaign_stores.campaign_id')
                .where(`campaign_stores.store_id = ${storeId}`)
                .select('campaigns.id')
                .getOne();

                if (!campaignId) {
                    return null;
                }

                const { id } = campaignId;

                return await getRepository(Scenarios).createQueryBuilder('scenarios')
                .where(`scenarios.campaign_id = ${id}`)
                .getOne()
        }
        catch (err) {
            console.log(err)
        }
    }

    public async findActiveStore(clientId: number) {
        const storeIdInCampaignStore: Array<number> = await this.getStoreIdByCampaignStore(clientId)
        try {
            if (storeIdInCampaignStore.length == 0) {
                return [];
            }
            return await getRepository(Stores)
                            .createQueryBuilder("stores")
                            .where(`stores.id IN (${storeIdInCampaignStore})`)
                            .getMany();
        }
        catch (err) {
            console.log(err)
        }
    }
}
