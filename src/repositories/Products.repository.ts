import { Products } from '../models/entities/Products';
import { BaseRepository } from './BaseRepository.repository';

export class ProductRepository extends BaseRepository<Products> {

	constructor () {
		super(Products);
	}
}