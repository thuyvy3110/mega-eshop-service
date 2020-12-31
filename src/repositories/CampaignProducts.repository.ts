import { CampaignProducts } from '../models/entities/CampaignProducts';
import { BaseRepository } from './BaseRepository.repository';

export class CampaignProductsRepository extends BaseRepository<CampaignProducts> {

	constructor () {
		super(CampaignProducts);
	}
}