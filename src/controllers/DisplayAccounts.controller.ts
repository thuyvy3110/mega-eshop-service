import { Request, Response } from 'express';
import { DisplayAccounts } from '../models/entities/DisplayAccounts';
import { DisplayAccountsRepository } from '../repositories/DisplayAccounts.repository';
import { BaseController } from './Base.controller';

class DisplayAccountsController extends BaseController<DisplayAccounts, DisplayAccountsRepository> {

	constructor () {
		super(DisplayAccounts, '/vs/display-accounts');
	}

	initRepository () {
		return new DisplayAccountsRepository();
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

export default DisplayAccountsController;