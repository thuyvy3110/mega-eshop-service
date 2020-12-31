import { ProductImgs } from '../models/entities/ProductImgs';
import { BaseRepository } from './BaseRepository.repository';

export class ProductImgsRepository extends BaseRepository<ProductImgs> {

	constructor() {
		super(ProductImgs);
	}
}