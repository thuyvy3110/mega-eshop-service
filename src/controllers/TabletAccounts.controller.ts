import { Request, Response } from 'express';
import { TabletAccounts } from '../models/entities/TabletAccounts';
import { TabletAccountsRepository } from '../repositories/TabletAccounts.repository';
import { BaseController } from './Base.controller';

class TabletAccountsController extends BaseController<TabletAccounts, TabletAccountsRepository> {

	constructor () {
		super(TabletAccounts, '/vs/tablet-accounts');
	}

	initRepository () {
		return new TabletAccountsRepository();
  }

	customRoutes () {
		this.router.get(this.path + '/getUserInfoByJwt/routes', (req: Request, res: Response) => this.getDataMethod(req, res));
	}

	getDataMethod = async (request: Request, response: Response) => {
		try {
			const token = request.get('Authorization')?.replace('Bearer ', '')
			const data = await this.repository.getUserInfoByJwt(token);
			return response.status(200).json(data);
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}
}

export default TabletAccountsController;