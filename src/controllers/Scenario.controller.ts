import { Request, Response } from 'express';
import _ from 'lodash';
import { getRepository } from 'typeorm';
import { Scenarios } from '../models/entities/Scenarios';
import { CampaignRepository } from '../repositories/Campaign.repository';
import { CategoriesRepository } from '../repositories/Categories.repository';
import { ScenarioRepository } from '../repositories/Scenario.repository';
import { BaseController } from './Base.controller';
import { ScenarioTreesRepository } from '../repositories/ScenarioTrees.repository'
import { ScenarioTrees } from '../models/entities/ScenarioTrees'
import { ScenarioInitialMovies } from '../models/entities/ScenarioInitialMovies'
import { ScenarioInitialMoviesRepository } from '../repositories/ScenarioInitialMovies.repository'

class ScenarioController extends BaseController<Scenarios, ScenarioRepository> {

	private categoriesRepository: CategoriesRepository;
	private campaignRepository: CampaignRepository;
	private scenarioTreesRepository: ScenarioTreesRepository;
	private scenarioInitialMovieRepository: ScenarioInitialMoviesRepository;

	constructor () {
		super(Scenarios, '/vs/scenario');
		this.categoriesRepository = new CategoriesRepository();
		this.campaignRepository = new CampaignRepository();
		this.scenarioTreesRepository = new ScenarioTreesRepository();
		this.scenarioInitialMovieRepository = new ScenarioInitialMoviesRepository();
	}

	initRepository () {
		return new ScenarioRepository();
	}

	customRoutes () {
		this.router.get(this.path + '/categories', (req: Request, res: Response) => this.getAllCategories(req, res));
		this.router.get(this.path + '/:clientId/list', (req: Request, res: Response) => this.getAll(req, res));
		this.router.post(this.path + '/:id(\\d+)/tree', (req: Request, res: Response) => this.updateTreeNode(req, res));
		this.router.post(this.path + '/:id(\\d+)/initial', (req: Request, res: Response) => this.updateInitialMovie(req, res));
		this.router.delete(this.path + '/:id(\\d+)/tree/:nodeId(\\d+)', (req: Request, res: Response) => this.deleteTreeNode(req, res));
	}

	async getAll (request: Request, response: Response): Promise<Response> {
		const clientId: number = await this.findClientId(request);

		try {
			if (_.isEmpty(request.query)) {
				return response.status(400).json({ message: 'Bad Request' });
			}
			const entities = await getRepository(this.entity).createQueryBuilder()
				.where('client_id = :client_id', { client_id: clientId })
				.orderBy('id', 'DESC')
				.paginate();
			let parsedEntities = [];
			if (entities) {
				for(let i = 0; i < entities.data.length; i++) {
					const entity = await this.resolveCampaignCategory(entities.data[i]);
					parsedEntities.push(entity);
				}
			}
			entities.data = parsedEntities;
			return response.status(200).json(entities);
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
		return super.paginate(request, response);
	}

	async resolveCampaignCategory(entity: any) {
		try {
			const campaign = await this.campaignRepository.findOneById(entity.campaignId);
			const category = await this.categoriesRepository.findOneById(entity.categoryId);
			if (campaign) {
				entity.campaignName = campaign.campaignName;
			}
			if (category) {
				entity.categoryName = category.campaignCategoryName;
			}
			return entity;
		} catch (error) {
			throw error;
		}
	}

	async findOne(request: Request, response: Response): Promise<Response<any>> {
		try {
			let record = await this.repository.findOneById(request.params.id);
			if (!record) {
				return response.status(404).json({ message: 'No Data' });
			}

			// fetch tree
			const trees = await this.scenarioTreesRepository.find({
				where: {
					'scenarioId': request.params.id
				}
			})
			trees.forEach((tree: ScenarioTrees) => {
				tree.nodeId = tree.id;
			})
			record.scenarioTrees = trees;

			// fetch initial movie
			const initialNode = await this.scenarioInitialMovieRepository
				.repository
				.createQueryBuilder()
				.where('scenario_id = :sc', {sc: request.params.id})
				.getOne();
			if (initialNode) {
				record.scenarioInitialMovies = initialNode;
				record.scenarioInitialMovies.scenarioId = record.id;
			}

			// finalize
			return response.status(200).json(record);
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	public async create (request: Request, response: Response) {
		const account = await this.findUsernameInRequest(request);
		/**
		 * When created new Scenario, a new record of Initial Movie will created.
		 * Initial movie has value of top node.
		 * After 2nd level on tree, values are kept in scenario_tree.
		 */
		try {
			const scenarioRecord = new Scenarios();
			scenarioRecord.scenarioName = request.body.scenario_name;
			scenarioRecord.campaignId = request.body.campaign_id;
			scenarioRecord.clientId = request.body.client_id;
			scenarioRecord.categoryId = request.body.category_id;
			scenarioRecord.content = request.body.content;
			scenarioRecord.updatedBy = account;
			scenarioRecord.createdBy = account;
			const result = await this.repository.upsert(scenarioRecord);

			// Initial move
			const node = new ScenarioInitialMovies();
			node.dispValue = 'Top Node';
			node.scenarioId = result.id;
			node.scenario = result;
			node.createdBy = account;
			node.updatedBy = account;
			node.movie_1st = '';
			node.movie_2nd = '';
			node.movie_1stCount = 0;
			node.movie_2ndCount = 0;
			node.percentage = 0;
			await this.scenarioInitialMovieRepository.insert(node);

			return response.status(200).json({
				message: 'Record Inserted',
				data: result.id
			});
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	public async update (request: Request, response: Response) {
		const account = await this.findUsernameInRequest(request);
		const record = await this.repository.findOneById(request.params.id);
		if (!record) {
			return response.status(404).json({ message: 'No Data' });
		}
		record.scenarioName = request.body.scenario_name;
		record.content = request.body.content;
		record.categoryId = request.body.category_id;
		record.campaignId = request.body.campaign_id;
		record.updatedBy = account;
		try {
			await this.repository.update(request.params.id, record);
			return response.status(200).json({ message: 'Record Updated' });
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE  });
		}
	}

	public async updateTreeNode(req: any, res: Response) {
		try {
			const account = await this.findUsernameInRequest(req);
			const scenario = await this.repository.findOneById(req.params.id);
			if(_.isEmpty(scenario)){
				return res.status(404).json({ message: 'Bad Request' });
			}
			const isNew = req.body.nodeId  !== "0" ? false : true;
			let node: ScenarioTrees;
			if(isNew) {
				node = new ScenarioTrees();
				node.createdBy = account;
				node.scenarioId = +req.params.id;
			} else {
				//@ts-ignore
				node = await this.scenarioTreesRepository.findOneById(req.body.nodeId);
				if(!node){
					return res.status(404).json({ message: 'Bad Request' });
				}
			}
			node.scenarioType = req.body.scenarioType;
			node.parentId = +req.body.parentId;
			if (node.parentId == -1) {
				node.parentId = 0;
			}
			node.dispValue = req.body.dispValue;
			if (req.body.value) {
				node.value = req.body.value;
			} else {
				node.value = '';
			}
			if (node.scenarioType === 'CALL') {
				node.value = node.dispValue;
			} else if (node.scenarioType == 'TABLET_QR' || node.scenarioType == 'DISPLAY_QR') {
				node.value = node.dispValue;
				node.scenarioReference = req.body.scenarioReference;
				node.scenarioReferenceId = req.body.scenarioReferenceId;
			}

			node.updatedBy = account;
			let nodeId: number;
			if (isNew) {
				if (req.body.parentId > 0) {
					const parentNode = await this.scenarioTreesRepository.findOneById(req.body.parentId);
					if (parentNode) {
						node.parent = parentNode;
					}
				}
				const r = await this.scenarioTreesRepository.upsert(node);
				node.id = r.id;
			}
			if (req.files && req.files['value']) {
				const uploadResult = await this.upload(req, 'value', 'scenario_tree_movie_' + node.id);
				node.value = uploadResult;
			}

			await this.scenarioTreesRepository.upsert(node);
			return res.status(200).json({
				message: 'Node is ' + (isNew ? 'created' : 'updated'),
				data: node.id
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	public async deleteTreeNode(req: Request, res: Response) {
		try {
			const account = await this.findUsernameInRequest(req);
			const scenario = await this.repository.findOneById(req.params.id);
			if(_.isEmpty(scenario)){
				return res.status(404).json({ message: 'Scenario not found' });
			}
			const node = await this.scenarioTreesRepository.findOneById(req.params.nodeId);
			if(!node){
				return res.status(404).json({ message: 'Node not found' });
			}
			await this.scenarioTreesRepository.deleteTreeNode(node);

			return res.status(200).json({
				message: 'Node is deleted'
			})
		} catch (error) {
			console.log(error);
			return res.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	public async updateInitialMovie(req: any, res: Response) {
		try {
			const account = await this.findUsernameInRequest(req);
			const scenario = await this.repository.findOneById(req.params.id);
			if (!scenario) {
				return res.status(404).json({ message: 'Scenario not found' });
			}
			const initialNode = await this.scenarioInitialMovieRepository
				.repository
				.createQueryBuilder()
				.where('scenario_id = :sc', {sc: scenario.id})
				.getOne();
			if (!initialNode) {
				return res.status(404).json({ message: 'Initial Node not found' });
			}
			initialNode.dispValue = req.body.dispValue;
			initialNode.percentage = req.body.percentage;
			initialNode.movie_1stCount = req.body.movie1stCount;
			initialNode.movie_2ndCount = req.body.movie2ndCount;
			initialNode.updatedBy = account;
			// file upload handling
			if (req.body.movie_1st) {
				initialNode.movie_1st = req.body.movie_1st;
			} else {
				const uploadResult = await this.upload(req, 'movie_1st', 'scenario_initial_movie_1st_' + initialNode.id );
				initialNode.movie_1st = uploadResult;
			}
			if (req.body.movie_2nd) {
				initialNode.movie_2nd = req.body.movie_2nd;
			} else {
				const uploadResult = await this.upload(req, 'movie_2nd', 'scenario_initial_movie_2nd_' + initialNode.id);
				initialNode.movie_2nd = uploadResult;
			}

			await this.scenarioInitialMovieRepository.update(initialNode.id, initialNode);
			return res.status(200).json({
				message: 'Initial Node is updated',
				data: initialNode.id
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	public async list (request: Request, response: Response) {
		try {
			console.log('ScenarioController - list: ' + request);
			const record = await this.repository.find();
			return response.status(200).json(record);
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	public async delete (request: Request, response: Response) {
		try {
			console.log('StoreSalespersonsController - delete: ' + request)
			request.params.id
				.split(',')
				.map(async (id: string) => {
					const scenario = await this.repository.findOneById(id);
					if (!scenario) {
						return response.status(400).json({ message: 'Record is not found' });
					}
					await this.repository.delete(scenario);
					console.log('deleted scenario', scenario);
				})
			return response.status(200).json({ message: 'Multiple Record Deleted!' });
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	// Get category
	getAllCategories = async (request: Request, response: Response) => {
		const clientId: string | number = await this.findClientId(request);
		try {
			const campaigns = await this.campaignRepository.getStatusActiveList(clientId);
			const categories = await this.categoriesRepository.getTypeScenario(clientId);
			return response.status(200).json({ campaigns, categories });
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}
}

export default ScenarioController;
