import { ProductImgs } from '../models/entities/ProductImgs';
import { ProductImgsRepository } from '../repositories/ProductImgs.repository';
import { BaseController } from './Base.controller';

class ProductImgController extends BaseController<ProductImgs, ProductImgsRepository> {

	constructor () {
		super(ProductImgs, '/vs/product-image');
	}

	initRepository () {
		return new ProductImgsRepository();
	}

	customRoutes () {
		return;
	}
}

export default ProductImgController;