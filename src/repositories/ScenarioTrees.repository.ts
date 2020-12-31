import { ScenarioTrees } from '../models/entities/ScenarioTrees';
import { BaseRepository } from './BaseRepository.repository';
import { getManager } from 'typeorm'

export class ScenarioTreesRepository extends BaseRepository<ScenarioTrees> {

	constructor () {
		super(ScenarioTrees);
	}

	public async deleteTreeNode(st: ScenarioTrees) {
		const manager = getManager();
		const trees = await manager.getTreeRepository(ScenarioTrees).findDescendants(st);
		for(const tree of trees) {
			await this.repository.delete(tree);
		}
	}
}