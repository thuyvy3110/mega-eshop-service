import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Stores } from '../models/entities/Stores';
import { ScenarioRepository } from '../repositories/Scenario.repository';
import { ScenarioInitialMoviesRepository } from '../repositories/ScenarioInitialMovies.repository';
import { ScenarioTreesRepository } from '../repositories/ScenarioTrees.repository';
import { StoreRepository } from '../repositories/Store.repository';
import { StoreSalespersonsRepository } from '../repositories/StoreSalesPerson.repository';
import { getFileFromS3 } from '../utils/Storage.utils';
import { BaseController } from './Base.controller';

class StoreController extends BaseController<Stores, StoreRepository> {

	private scenarioTreesRepository: ScenarioTreesRepository;
	private scenarioInitialMovieRepository: ScenarioInitialMoviesRepository;
	private scenarioRepository: ScenarioRepository;
	private storeRepository : StoreRepository;
	private storeSalePersonRepository: StoreSalespersonsRepository;

	constructor () {
		super(Stores, '/vs/stores');
		this.scenarioTreesRepository = new ScenarioTreesRepository();
		this.scenarioInitialMovieRepository = new ScenarioInitialMoviesRepository();
		this.scenarioRepository = new ScenarioRepository();
		this.storeRepository = new StoreRepository();
		this.storeSalePersonRepository = new StoreSalespersonsRepository();
	}

	initRepository () {
		return new StoreRepository();
	}

	customRoutes () {
		this.router.get(this.path + '/active', (req: Request, res: Response) => this.getActiveStore(req, res));
		this.router.get(this.path + '/active-of-saleperson', (req: Request, res: Response) => this.getActiveStoreOfSalePerson(req, res));
		this.router.get(this.path + '/:id/scenario', (req: Request, res: Response) => this.getScenarioTreeByStore(req, res));
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
			console.log(error)
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
			})

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
						.where('scenario_id = :sc', {sc: id})
						.getOne();

			if (initialNode) {
				initialNode.movie_1st = await getFileFromS3(initialNode.movie_1st)
				initialNode.movie_2nd = await getFileFromS3(initialNode.movie_2nd)
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
			const clientId: any = await this.findParentClientIdFirst(request)
			const record = await this.repository.findActiveStore(clientId)

			return response.status(200).json(record)
		} catch (error) {
			console.log(error)
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
		}
	}

	getActiveStoreOfSalePerson = async (request: Request, response: Response) => {
		try {
			const account = await this.findUsernameInRequest(request);
			const salePerson = await this.findSalePersonByAccount(account);
			if (!salePerson) {
				return response.status(200).json([])
			}
			const storeSalePersons = await this.storeSalePersonRepository.findBySalePersonId(salePerson.id);
			const storeIds = storeSalePersons.map(s => s.storeId) || [];
			if (storeIds.length == 0) {
				return response.status(200).json([])
			}
			const record = await this.storeRepository.findByIds(storeIds);
			return response.status(200).json(record)
		} catch (error) {
			console.log(error)
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
		}
	}
}

export default StoreController;