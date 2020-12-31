import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { SaleAreas } from '../models/entities/SaleAreas';
import { SaleAreaRepository } from '../repositories/SaleAreas.repository';
import { BaseController } from './Base.controller';

class SaleAreaController extends BaseController<SaleAreas, SaleAreaRepository> {

	constructor() {
		super(SaleAreas, '/vs/sale-area');
	}

	initRepository() {
		return new SaleAreaRepository();
	}

	customRoutes() {
		return;
	}

	public async find(request: Request, response: Response) {
		const clientId: number = await this.findClientId(request);
		const parentClientId: number = await this.findParentClientIdFirst(request);
		try {
			const entities = await getRepository(this.entity).createQueryBuilder()
				.where('client_id in (:clientId, :parentClientId)', { clientId, parentClientId })
				.orderBy('updated_at', 'DESC')
				.getMany();
			return response.status(200).json(entities);
		} catch (error) {
			console.log(error)
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
		}
	}
}

export default SaleAreaController;