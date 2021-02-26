import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import _ from 'lodash';
import { getRepository } from 'typeorm';

import { Stores } from '../models/entities/Stores';
import { DisplayAccountsRepository } from '../repositories/DisplayAccounts.repository';
import { ScenarioInitialMoviesRepository } from '../repositories/ScenarioInitialMovies.repository';
import { ScenarioTreesRepository } from '../repositories/ScenarioTrees.repository';
import { StoreRepository } from '../repositories/Store.repository';
import { StoreSalespersonsRepository } from '../repositories/StoreSalesPerson.repository';
import { TabletAccountsRepository } from '../repositories/TabletAccounts.repository';
import { getFileFromS3 } from '../utils/Storage.utils';
import { BaseController } from './Base.controller';

class StoreController extends BaseController<Stores, StoreRepository> {

	private scenarioTreesRepository: ScenarioTreesRepository;
	private scenarioInitialMovieRepository: ScenarioInitialMoviesRepository;
	private storeRepository: StoreRepository;
	private storeSalePersonRepository: StoreSalespersonsRepository;
	private displayAccountsRepository: DisplayAccountsRepository;
	private tabletAccountsRepository: TabletAccountsRepository;

	constructor() {
		super(Stores, '/vs/stores');
		this.scenarioTreesRepository = new ScenarioTreesRepository();
		this.scenarioInitialMovieRepository = new ScenarioInitialMoviesRepository();
		this.storeRepository = new StoreRepository();
		this.storeSalePersonRepository = new StoreSalespersonsRepository();
		this.tabletAccountsRepository = new TabletAccountsRepository();
		this.displayAccountsRepository = new DisplayAccountsRepository();
	}

	initRepository() {
		return new StoreRepository();
	}

	customRoutes() {
		this.router.get(this.path + '/active', (req: Request, res: Response) => this.getActiveStore(req, res));
		// tslint:disable-next-line:max-line-length
		this.router.get(this.path + '/active-of-saleperson', (req: Request, res: Response) => this.getActiveStoreOfSalePerson(req, res));
		this.router.get(this.path + '/:id/scenario', (req: Request, res: Response) => this.getScenarioTreeByStore(req, res));
		this.router.put(
			this.path,
			[
				body('storeName').notEmpty().isString(),
				body('address').notEmpty().isString(),
				body('officer').notEmpty().isString(),
				body('contactInformation').notEmpty().isString()
			],
			(req: any, res: Response) => this.save(req, res)
		);
		this.router.post(
			this.path,
			[
				body('storeName').notEmpty().isString(),
				body('address').notEmpty().isString(),
				body('officer').notEmpty().isString(),
				body('contactInformation').notEmpty().isString()
			],
			(req: any, res: Response) => this.save(req, res)
		);
	}

	public async find(request: Request, response: Response) {
		const clientId: number = await this.findClientId(request);
		try {
			const entities = await getRepository(this.entity).createQueryBuilder()
				.where('client_id = :client_id', { client_id: clientId })
				.orderBy('updated_at', 'DESC', 'NULLS LAST')
				.orderBy('created_at', 'DESC')
				.getMany();
			return response.status(200).json(entities);
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	async paginate(request: Request, response: Response) {
		const clientId: any = await this.findParentClientIdFirst(request);
		try {
			if (_.isEmpty(request.query)) {
				return response.status(500).json({ message: 'Bad Request' });
			}
			console.log('Paginate params: ', request.query);
			const entities = await getRepository(this.entity)
				.createQueryBuilder('store')
				.where('store.client_id = :clientId', { clientId })
				.orderBy('store.updatedAt', 'DESC')
				.paginate();
			return response.status(200).json(entities);
		} catch (error) {
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	async getScenarioTreeByStore(request: Request, response: Response): Promise<Response<any>> {
		try {
			const sce = await this.storeRepository.findScenarioFromStore(+request.params.id);
			if (!sce) {
				return response.status(500).json({ err_code: this.errCode.ERROR_ENTRY_NOT_FOUND_SENARIO });
			}

			const { id } = sce;

			const trees = await this.scenarioTreesRepository.find({
				where: {
					'scenarioId': id
				}
			});

			for (let i = 0; i < trees.length; ++i) {
				trees[i].nodeId = trees[i].id;
				if (trees[i].value.startsWith('demo/')) {
					trees[i].value = await getFileFromS3(trees[i].value);
				}
			}

			sce.scenarioTrees = trees;


			const initialNode = await this.scenarioInitialMovieRepository
				.repository
				.createQueryBuilder()
				.where('scenario_id = :sc', { sc: id })
				.getOne();

			if (initialNode) {
				initialNode.movie_1st = await getFileFromS3(initialNode.movie_1st);
				initialNode.movie_2nd = await getFileFromS3(initialNode.movie_2nd);
				sce.scenarioInitialMovies = initialNode;
			}

			return response.status(200).json(sce);
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	getActiveStore = async (request: Request, response: Response) => {
		try {
			const clientId: any = await this.findParentClientIdFirst(request);
			const record = await this.repository.findActiveStore(clientId);

			return response.status(200).json(record);
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	getActiveStoreOfSalePerson = async (request: Request, response: Response) => {
		try {
			const account = await this.findUsernameInRequest(request);
			const salePerson = await this.findSalePersonByAccount(account);
			if (!salePerson) {
				return response.status(200).json([]);
			}
			const storeSalePersons = await this.storeSalePersonRepository.findBySalePersonId(salePerson.id);
			const storeIds = storeSalePersons.map(s => s.storeId) || [];
			if (storeIds.length == 0) {
				return response.status(200).json([]);
			}
			const record = await this.storeRepository.findByIds(storeIds);
			return response.status(200).json(record);
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
		}
	}

	save = async (request: any, response: Response) => {
		const clientId: any = await this.findClientId(request);
		const account = await this.findUsernameInRequest(request);
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(500).json({ err_code: this.errCode.ERROR_VALIDATION });
		}

		try {
			const isNew = Number(request.body.storeId) > 0 ? false : true;
			let record: Stores;
			if (isNew) {
				record = new Stores();
				record.createdBy = account;
				record.updatedBy = account;
			} else {
				//@ts-ignore
				record = await this.repository.findOneById(request.body.storeId);
				if (!record) {
					return response.status(404).json({ message: 'Store not found' });
				}
				record.updatedBy = account;
			}
			record.storeName = request.body.storeName;
			record.address = request.body.address;
			record.clientId = clientId;
			record.officer = request.body.officer;
			record.memo = request.body.memo;
			record.contactInformation = request.body.contactInformation;

			const store = await this.repository.upsert(record);
			await this.storeSalePersonRepository.deleteByStoreId(store.id);
			const salespersonIds = request.body.salespersonIds;
			if (!_.isEmpty(salespersonIds)) {
				await this.storeSalePersonRepository.saveByStoreId(store.id, salespersonIds, account);
			}
			return response.status(200).json({ status: 'success', store_id: store.id });
		} catch (error) {
			console.log(error);
			return response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	async findOne(request: Request, response: Response) {
		try {
			console.log('FindOne params: ', request.params.id);
			// tslint:disable-next-line:max-line-length
			const record = await this.repository.findOneById(request.params.id, { relations: ['displayAccounts', 'tabletAccounts', 'storeSalespersons', 'storeSalespersons.salesperson'] });
			if (record) {
				const salespersons = record.storeSalespersons ? record.storeSalespersons.map(x => x.salesperson) : [];
				Object.assign(record, { salespersons, storeSalespersons: undefined });
				const displayAccounts = record.displayAccounts ? record.displayAccounts.map(x => x.account) : [];
				Object.assign(record, { displayAccounts });
				const tabletAccounts = record.tabletAccounts ? record.tabletAccounts.map(x => x.account) : [];
				Object.assign(record, { tabletAccounts });
				return response.status(200).json(record);
			}
			return response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND });
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	async delete(request: Request, response: Response): Promise<Response> {
		if (_.isEmpty(request.params.id)) {
			return response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND });
		}
		try {
			const store = await this.repository.findOneById(request.params.id,
				{ relations: ['displayAccounts', 'tabletAccounts', 'storeSalespersons', 'campaignStores'] });
			if (store) {
				if (!_.isEmpty(store.campaignStores)) {
					return response.status(500).json({ err_code: this.errCode.ERROR_ENTRY_CONSTRAINT + '.campaign' });
				}
				if (!_.isEmpty(store.displayAccounts)) {
					await this.displayAccountsRepository.deleteByStoreId(+request.params.id);
				}
				if (!_.isEmpty(store.tabletAccounts)) {
					await this.tabletAccountsRepository.deleteByStoreId(+request.params.id);
				}
				if (!_.isEmpty(store.storeSalespersons)) {
					await this.storeSalePersonRepository.deleteByStoreId(+request.params.id);
				}
				await this.repository.delete(store.id);
				return response.status(200).json({
					status: 'ok',
					tabletAccounts: store.tabletAccounts,
					displayAccounts: store.displayAccounts
				});
			}
			return response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND });
		} catch (error) {
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}
}

export default StoreController;