import { CampaignProducts } from '../models/entities/CampaignProducts';
import { BaseRepository } from './BaseRepository.repository';

export class CampaignProductRepository extends BaseRepository<CampaignProducts>{
		constructor () {
				super(CampaignProducts);
		}
		public async get (clientId: any) {
				return await this.repository.find({
						where: {
								clientId
						}
				});
		}

		public save (campaignId: any, productIds: number[], account: string){
				productIds.map(async (productId: number) => {
						const record = new CampaignProducts();
						record.campaignId = campaignId;
						record.productId = productId;
						record.updatedBy = account;
						record.createdBy = account;
						await this.repository.save(record);
				});
		}

		public async delete (campaignId: any) {
				return await this.repository.delete({ 'campaignId': campaignId });
		}
}