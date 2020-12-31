import { CampaignStores } from '../models/entities/CampaignStores';
import { BaseRepository } from './BaseRepository.repository';

export class CampaignStoreRepository extends BaseRepository<CampaignStores>{
		constructor () {
				super(CampaignStores);
		}
		public async get (clientId: any) {
				return await this.repository.find({
						where: {
								clientId
						}
				});
		}

		public async save (campaignId: any, storeIds: number[], account: string) {
				storeIds.map(async (storeId: number) => {
						const record = new CampaignStores();
						record.campaignId = campaignId;
						record.storeId = storeId;
						record.createdBy = account;
						record.updatedBy = account;
						await this.repository.save(record);
				});
		}

		public async delete (campaignId: any) {
				return await this.repository.delete({ 'campaignId': campaignId });
		}
}