import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { DisplayAccounts } from '../models/entities/DisplayAccounts';
import { DisplayAccountsRepository } from '../repositories/DisplayAccounts.repository';
import { BaseController } from './Base.controller';

class DisplayAccountsController extends BaseController<DisplayAccounts, DisplayAccountsRepository> {

	constructor() {
		super(DisplayAccounts, '/vs/display-accounts');
	}

	initRepository() {
		return new DisplayAccountsRepository();
	}

	customRoutes() {
		this.router.get(this.path + '/getUserInfoByJwt/routes',
			(req: Request, res: Response) => this.getDataMethod(req, res));
		this.router.post(
			this.path,
			[
				body('storeId').notEmpty(),
				body('account').notEmpty().isString().isLength({ max: 100 }),
			],
			(req: any, res: Response) => this.save(req, res)
		);
		this.router.put(this.path, (req: any, res: Response) => {
			return res.status(500).json({ status: 'error', err_code: this.errCode.ERROR_RESPONSE });
		});
		this.router.delete(this.path + '/:id', (req: Request, res: Response) => {
			return res.status(500).json({ status: 'error', err_code: this.errCode.ERROR_RESPONSE });
		});
	}

	// Save
	save = async (request: any, response: Response) => {
		const account = await this.findUsernameInRequest(request);
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(500).json({ err_code: this.errCode.ERROR_VALIDATION });
		}
		const data = request.body;
		try {
			const record = new DisplayAccounts();
			record.account = data.account;
			record.storeId = +data.storeId;
			record.createdBy = account;
			record.updatedBy = account;

			const entity = await this.repository.upsert(record);
			return response.status(200).json({ status: 'success', message: 'Success' });
		} catch (error) {
			console.log(error);
			return response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_RESPONSE });
		}
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