import { ScenarioInitialMovies } from '../models/entities/ScenarioInitialMovies';
import { BaseRepository } from './BaseRepository.repository';

export class ScenarioInitialMoviesRepository extends BaseRepository<ScenarioInitialMovies> {

	constructor () {
		super(ScenarioInitialMovies);
	}
}