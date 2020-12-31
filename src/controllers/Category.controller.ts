import { Request, Response } from 'express';
import _ from 'lodash';
import { getRepository } from 'typeorm';

import { Categories } from '../models/entities/Categories';
import { CategoriesRepository } from '../repositories/Categories.repository';
import { BaseController } from './Base.controller';

class CategoryController extends BaseController<Categories, CategoriesRepository> {

	constructor() {
		super(Categories, '/vs/category');
	}

	initRepository() {
		return new CategoriesRepository();
	}

	customRoutes() {
		// get categories
		// tslint:disable-next-line:max-line-length
		this.router.get(this.path + '/type/:categoryType', (req: Request, res: Response) => this.getCategoriesByType(req, res));
	}

	// Get category
	getCategoriesByType = async (request: Request, response: Response) => {
		const clientId: any = await this.findClientId(request);
		const parentClientId: number = await this.findParentClientIdFirst(request);
		console.log('FindOne params type: ', request.params.categoryType);
		if (_.isEmpty(request.params.categoryType)) {
			return response.status(400).json({ status: 'empty category type', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND });
		}
		try {
			let categories;
			switch (request.params.categoryType) {
				case 'campaign':
				case 'scenario':
				case 'product':
				case 'speciality':
					categories = await getRepository(this.entity).createQueryBuilder()
					// tslint:disable-next-line:max-line-length
					.where('client_id in (:clientId, :parentClientId) and category_type = :categoryType', { clientId, parentClientId, categoryType:  request.params.categoryType})
					.orderBy('updated_at', 'DESC')
					.getMany();
					break;
				default:
					return response.status(400).json({ status: 'category type wrong', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND });
			}
			return response.status(200).json({ categories });
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}
}

export default CategoryController;