import { Customers } from '../models/entities/Customers';
import { BaseRepository } from './BaseRepository.repository';

export class CustomerRepository extends BaseRepository<Customers> {

	constructor () {
		super(Customers);
    }
}