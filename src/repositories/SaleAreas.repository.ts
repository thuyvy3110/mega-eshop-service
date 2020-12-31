import { SaleAreas } from '../models/entities/SaleAreas';
import { BaseRepository } from './BaseRepository.repository';

export class SaleAreaRepository extends BaseRepository<SaleAreas> {

	constructor () {
		super(SaleAreas);
	}
}