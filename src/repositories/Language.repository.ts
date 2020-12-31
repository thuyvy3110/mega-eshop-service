import { Languages } from '../models/entities/Languages';
import { BaseRepository } from './BaseRepository.repository';

export class LanguageRepository extends BaseRepository<Languages> {

	constructor () {
		super(Languages);
	}
}