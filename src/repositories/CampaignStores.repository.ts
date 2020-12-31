import { CampaignStores } from '../models/entities/CampaignStores';
import { BaseRepository } from './BaseRepository.repository';

export class CampaignStoresRepository extends BaseRepository<CampaignStores> {

	constructor () {
		super(CampaignStores);
	}
}