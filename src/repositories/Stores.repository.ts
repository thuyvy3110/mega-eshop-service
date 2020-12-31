import { Stores } from '../models/entities/Stores';
import { BaseRepository } from './BaseRepository.repository';

export class StoreRepository extends BaseRepository<Stores> {

	constructor () {
		super(Stores);
	}
}