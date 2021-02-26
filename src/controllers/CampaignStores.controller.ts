import { Request, Response } from 'express';
import { CampaignStores } from '../models/entities/CampaignStores';
import { CampaignStoreRepository } from '../repositories/CampaignStore.repository';
import { BaseController } from './Base.controller';

class StoreController extends BaseController<CampaignStores, CampaignStoreRepository> {

	constructor () {
		super(CampaignStores, '/vs/campaign-stores');
	}

	initRepository () {
		return new CampaignStoreRepository();
	}
	customRoutes () {
		return;
	}
}

export default StoreController;