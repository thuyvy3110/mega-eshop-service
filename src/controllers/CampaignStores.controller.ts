import { Request, Response } from 'express';
import { CampaignStores } from '../models/entities/CampaignStores';
import { CampaignStoresRepository } from '../repositories/CampaignStores.repository';
import { BaseController } from './Base.controller';

class StoreController extends BaseController<CampaignStores, CampaignStoresRepository> {

	constructor () {
		super(CampaignStores, '/vs/campaign-stores');
	}

	initRepository () {
		return new CampaignStoresRepository();
	}
	customRoutes () {
		return;
	}
}

export default StoreController;