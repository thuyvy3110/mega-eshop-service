import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import _ from 'lodash';
import { getRepository } from 'typeorm';

import { SalePerson } from '../models/entities/Salespersons';
import { SalespersonRepository } from '../repositories/SalesPerson.repository';
import { SalespersonsAreasRepository } from '../repositories/SalespersonsAreas.repository';
import { BaseController } from './Base.controller';

class SalespersonsController extends BaseController<SalePerson, SalespersonRepository> {

	private salespersonsAreasRepository: SalespersonsAreasRepository;

	constructor() {
		super(SalePerson, '/vs/salespersons');
		this.salespersonsAreasRepository = new SalespersonsAreasRepository();
	}

	initRepository() {
		return new SalespersonRepository();
	}

	customRoutes() {
		this.router.put(
			this.path,
			[
				body('id').notEmpty().isString(),
				body('name').notEmpty().isString().isLength({ max: 100 }),
				body('account').notEmpty().isString().isLength({ max: 100 }),
				body('evaluation').notEmpty().isLength({ max: 10 }),
				body('company').notEmpty().isString().isLength({ max: 100 }),
				body('officer').notEmpty().isString().isLength({ max: 100 }),
				body('contactInformation').notEmpty().isString().isLength({ max: 200 }),
			],
			(req: any, res: Response) => this.save(req, res)
		);
		this.router.post(
			this.path,
			[
				body('name').notEmpty().isString().isLength({ max: 100 }),
				body('account').notEmpty().isString().isLength({ max: 100 }),
				body('evaluation').notEmpty().isLength({ max: 10 }),
				body('company').notEmpty().isString().isLength({ max: 100 }),
				body('officer').notEmpty().isString().isLength({ max: 100 }),
				body('contactInformation').notEmpty().isString().isLength({ max: 200 }),
			],
			(req: any, res: Response) => this.save(req, res)
		);

		// tslint:disable-next-line:max-line-length
		this.router.get(this.path + '/getUserInfoByJwt/routes', (req: Request, res: Response) => this.getDataMethod(req, res));
	}

	async paginate(request: any, response: Response): Promise<Response> {
		const clientId: number = await this.findClientId(request);
		const pClientId: number = await this.findParentClientIdFirst(request);

		try {
			if (_.isEmpty(request.query)) {
				return response.status(400).json({ message: 'Bad Request' });
			}
			console.log('Paginate params: ', request.query);
			const entities = await getRepository(this.entity)
				.createQueryBuilder('salespersons')
				.leftJoinAndSelect('salespersons.category', 'categories')
				.leftJoinAndSelect('salespersons.salespersonsAreas', 'salespersonsAreas')
				.leftJoinAndSelect('salespersonsAreas.saleArea', 'saleAreas')
				.where('salespersons.clientId IN (:clientId, :pClientId)', { clientId, pClientId })
				.orderBy('salespersons.updatedAt', 'DESC')
				.paginate();

			if (!_.isEmpty(entities)) {
				entities?.data.forEach((sp: SalePerson) => {
					const saleAreas = sp.salespersonsAreas ? sp.salespersonsAreas.map(x => x.saleArea?.area) : [];
					sp = Object.assign(sp, {
						saleAreas, salespersonsAreas: undefined,
						specialtyCategory: sp.category?.campaignCategoryName,
						category: undefined
					});
				});
			}
			return response.status(200).json(entities);
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	async find(request: Request, response: Response) {
		const clientId: number = await this.findClientId(request);
		const pClientId: number = await this.findParentClientIdFirst(request);
		try {
			console.log('BaseController - find: ' + request);
			const entities = await getRepository(this.entity)
				.createQueryBuilder('salespersons')
				.leftJoinAndSelect('salespersons.category', 'categories')
				.leftJoinAndSelect('salespersons.salespersonsAreas', 'salespersonsAreas')
				.leftJoinAndSelect('salespersonsAreas.saleArea', 'saleAreas')
				.where('salespersons.clientId IN (:clientId, :pClientId)', { clientId, pClientId })
				.orderBy('salespersons.updatedAt', 'DESC')
				.getMany();
			if (!_.isEmpty(entities)) {
				entities.forEach((sp: SalePerson) => {
					const saleAreas = sp.salespersonsAreas ? sp.salespersonsAreas.map(x => x.saleArea?.area) : [];
					sp = Object.assign(sp, {
						saleAreas, salespersonsAreas: undefined,
						specialtyCategory: sp.category?.campaignCategoryName,
						category: undefined
					});
				});
			}
			return response.status(200).json(entities);
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	async findOne(request: Request, response: Response) {
		try {
			console.log('FindOne params: ', request.params.id);
			const record = await this.repository.findOneById(request.params.id, { relations: ['category', 'salespersonsAreas', 'salespersonsAreas.saleArea'] });
			if (record) {
				const saleAreas = record.salespersonsAreas ? record.salespersonsAreas.map(x => x.saleArea) : [];
				Object.assign(record, { saleAreas, salespersonsAreas: undefined });
				return response.status(200).json(record);
			}
			return response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND });
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	// Save
	save = async (request: any, response: Response) => {
		const clientId: any = await this.findClientId(request);
		const account = await this.findUsernameInRequest(request);
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(500).json({ err_code: this.errCode.ERROR_VALIDATION });
		}
		const data = request.body;
		// validate evaluation range
		if (+data.evaluation < 0 || +data.evaluation > 5) {
			return response.status(500).json({ status: 'evaluation invalid', err_code: this.errCode.ERROR_VALIDATION });
		}
		try {
			const isNew = Number(data.id) > 0 ? false : true;
			let record: SalePerson | undefined;
			if (isNew) {
				record = new SalePerson();
				record.createdBy = account;
				record.clientId = clientId;
			} else {
				// get more information to merge
				record = await this.repository.findOneById(data.id);
				if (!record) {
					return response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND });
				}
			}
			record.name = data.name;
			record.account = data.account;
			record.evaluation = data.evaluation;
			record.company = data.company;
			record.contactInformation = data.contactInformation;
			record.officer = data.officer;
			record.categoryId = data.categoryId;
			record.memo = data.memo;
			record.updatedBy = account;

			const sp = await this.repository.upsert(record);
			await this.salespersonsAreasRepository.deleteBySalespersonId(sp.id);
			const saleAreaIds = request.body.saleAreaIds;
			if (!_.isEmpty(saleAreaIds)) {
				await this.salespersonsAreasRepository.saveBySalespersonId(sp.id, saleAreaIds, account);
			}
			return response.status(200).json({ status: 'success', message: 'Success' });
		} catch (error) {
			console.log(error);
			return response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	async delete(request: Request, response: Response) {
		if (_.isEmpty(request.params.id)) {
			return response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND });
		}
		try {
			await this.salespersonsAreasRepository.deleteBySalespersonId(+request.params.id);
			await this.repository.delete(request.params.id);
			return response.status(200).json({ message: 'Record deleted' });
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
		}
	}

	getDataMethod = async (request: Request, response: Response) => {
		try {
			const token = request.get('Authorization')?.toString().replace('Bearer ', '');
			const data = await this.repository.getUserInfoByJwt(token);
			return response.status(200).json(data);
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}
}

export default SalespersonsController;