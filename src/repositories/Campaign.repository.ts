import moment from 'moment';
import { CampaignProducts } from '../models/entities/CampaignProducts';
import { Campaigns } from '../models/entities/Campaigns';
import { CampaignStores } from '../models/entities/CampaignStores';
import { BaseRepository } from './BaseRepository.repository';

export class CampaignRepository extends BaseRepository<Campaigns> {

	constructor () {
		super(Campaigns);
	}

	// get list campaign inactive with paging
	public async getStatusInActiveList (clientId: any) {
		const baseDate = moment(Date.now()).toISOString();
		return await this.repository
			.createQueryBuilder('campaigns')
			.innerJoinAndSelect('campaigns.category', 'category')
			.where('campaigns.client_id = :client_id', {client_id: clientId})
			.andWhere('(campaigns.end_date < :base_date)', {base_date : baseDate})
			.orderBy('campaigns.updatedAt', 'DESC')
			.paginate();
	}

	// get list campaign active
	public async getStatusActiveList (clientId: any){
		const baseDate = moment(Date.now()).toISOString();
		return await this.repository
			.createQueryBuilder()
			.where('client_id = :client_id', {client_id: clientId})
			.andWhere('(end_date >= :base_date)', {base_date : baseDate})
			.orderBy('updated_at', 'DESC')
			.getMany();
	}

	public async getOne (id : Object){
		const data : any = await this.repository.findOne(id, { relations: ['campaignStores', 'campaignProducts', 'category'] });
		if (!data) {
			return null
		}
		const result : object = {
			...data,
			startDate: data.startDate ? moment(data.startDate).format('YYYY-MM-DDTHH:mm'): '',
			endDate: data.endDate ? moment(data.endDate).format('YYYY-MM-DDTHH:mm'): '',
			storeIds: data.campaignStores ? data.campaignStores.map((item:CampaignStores) => item.storeId) : [],
			productIds: data.campaignProducts ? data.campaignProducts.map((item:CampaignProducts) => item.productId) : [],
		};
		return result;
	}

	public async updateStatus (body:any){
		const record: Campaigns = new Campaigns();
		record.id = body.id;
		record.status = body.status;
		return await this.repository.save(record);
	}
}