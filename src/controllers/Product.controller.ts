import csv from 'csv-parser';
import { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import fs from 'fs';
import _ from 'lodash';
import { getRepository } from 'typeorm';

import { ProductImgs } from '../models/entities/ProductImgs';
import { Products } from '../models/entities/Products';
import { ProductImgsRepository } from '../repositories/ProductImgs.repository';
import { ProductRepository } from '../repositories/Products.repository';
import { BaseController } from './Base.controller';

class ProductController extends BaseController<Products, ProductRepository> {
	private productImgsRepository: ProductImgsRepository;

	constructor() {
		super(Products, '/vs/product');
		this.productImgsRepository = new ProductImgsRepository();
	}

	initRepository() {
		return new ProductRepository();
	}

	customRoutes() {
		this.router.put(
			this.path,
			[
				body('id').notEmpty().isString(),
				body('productName').notEmpty().isString().isLength({ max: 200 }),
				body('categoryId').notEmpty(),
				body('companyName').notEmpty().isString().isLength({ max: 100 }),
				body('price').notEmpty().isString().isLength({ max: 100 }),
				body('url').notEmpty().isString().isLength({ max: 100 }),
			],
			(req: any, res: Response) => this.save(req, res)
		);
		this.router.post(
			this.path,
			[
				body('productName').notEmpty().isString().isLength({ max: 200 }),
				body('categoryId').notEmpty(),
				body('companyName').notEmpty().isString().isLength({ max: 100 }),
				body('price').notEmpty().isString().isLength({ max: 100 }),
				body('url').notEmpty().isString().isLength({ max: 100 }),
			],
			(req: any, res: Response) => this.save(req, res)
		);

		this.router.post(this.path + '/bulk-insert', (req: any, res: Response) => this.bulkInsertByCsvFile(req, res));
	}

	async paginate(request: any, response: Response): Promise<Response> {
		const clientId: number = await this.findClientId(request);

		try {
			if (_.isEmpty(request.query)) {
				return response.status(400).json({ message: 'Bad Request' });
			}
			console.log('Paginate params: ', request.query);
			const entities = await getRepository(this.entity)
				.createQueryBuilder('products')
				.leftJoinAndSelect('products.category', 'categories')
				.where('products.clientId = :client_id', { client_id: clientId })
				.orderBy('products.updatedAt', 'DESC')
				.paginate();
			return response.status(200).json(entities);
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	async findOne(request: Request, response: Response) {
		try {
			console.log('FindOne params: ', request.params.id);
			const record = await this.repository.findOneById(request.params.id, { relations: ['productImgs'] });
			if (_.isEmpty(record)) {
				return response.status(400).json({ status: 'error', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND });
			}
			return response.status(200).json(record);
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
		}
	}

	// Save
	save = async (request: any, response: Response) => {
		const clientId: any = await this.findClientId(request);
		const account = await this.findUsernameInRequest(request);
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() });
		}
		const data = request.body;
		try {
			const isNew = Number(data.id) > 0 ? false : true;
			let record: Products | undefined;
			if (isNew) {
				record = new Products()
				record.createdBy = account;
			} else {
				// get more information to merge
				record = await this.repository.findOneById(data.id, { relations: ['productImgs'] });
				if (!record) {
					return response.status(400).json({ status: 'error', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND });
				}
			}

			record.productName = data.productName;
			record.categoryId = data.categoryId;
			record.companyName = data.companyName;
			record.price = data.price;
			record.url = data.url;
			record.description = data.description;
			record.memo = data.memo;
			record.clientId = clientId;
			record.updatedBy = account;

			const product = await this.repository.upsert(record);
			const productImgs: ProductImgs[] = [];
			for (const fieldName of ['image1', 'image2', 'image3', 'image4', 'image5']) {
				let productImg;
				if (isNew) {
					productImg = new ProductImgs();
					productImg.productId = product.id;
					productImg.fieldName = fieldName;
					productImg.img = ''; // default empty string
					productImg.createdBy = account;
					productImg.updatedBy = account;
				} else {
					productImg = record?.productImgs?.filter((img: ProductImgs) => img.fieldName === fieldName)[0];
					if (!productImg) {
						productImg = new ProductImgs();
						productImg.productId = product.id;
						productImg.fieldName = fieldName;
						productImg.img = ''; // default empty string
						productImg.createdBy = account;
						productImg.updatedBy = account;
					}
				}
				// tslint:disable-next-line:max-line-length
				await this.uploadHandler(productImg, request, fieldName, 'product_id_' + product.id + '_' + fieldName, data[fieldName]);
				productImgs.push(productImg);
			}
			await this.productImgsRepository.upserts(productImgs);
			return response.status(200).json({ status: 'success', message: 'Success' });
		} catch (error) {
			console.log(error);
			return response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	async uploadHandler(record: ProductImgs, req: any, field: string, key: string, defaultValue: string) {
		if (req.files && req.files[field]) {
			defaultValue = await this.upload(req, field, key);
		}
		record.img = defaultValue;
	}

	bulkInsertByCsvFile = async (request: any, response: Response) => {
		const fieldName = 'csvFile';
		if (request.files && request.files[fieldName]) {
			const file = request.files[fieldName];
			const filePath = file.tempFilePath;
			if (file?.name.indexOf('.csv') === -1) {
				return response.status(400).json({ status: 'error', err_code: this.errCode.ERROR_RESPONSE });
			}
			const csvData: Products[] = [];
			try {
				const readStream = fs.createReadStream(filePath)
					.pipe(csv(['id', 'productName', 'clientId', 'categoryId', 'companyName', 'price', 'url', 'description', 'memo', 'updatedBy', 'updatedAt', 'createdBy', 'createdAt']))
					.on('data', (row) => {
						console.log(row);
						csvData.push(row);
					})
					.on('end', async () => {
						console.log(csvData);
						readStream.destroy();
						try {
							await this.repository.upserts(csvData);
							return response.status(200).json({ status: 'success', message: 'Success' });
						} catch (error) {
							console.log(error.code);
							return response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_RESPONSE });
						}
					})
					.on('error', (error) => {
						console.log(error);
					});
			} catch (error) {
				console.log(error);
				return response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_RESPONSE });
			}
		} else {
			return response.status(400).json({ status: 'error', err_code: this.errCode.ERROR_RESPONSE });
		}
	}

	async delete(request: Request, response: Response) {
		if (_.isEmpty(request.params.id)) {
			return response.status(400).json({ status: 'error', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND });
		}
		try {
			console.log('BaseController - delete: ' + request);
			await this.productImgsRepository.delete({ 'productId': +request.params.id });
			await this.repository.delete(request.params.id);
			return response.status(200).json({ message: 'Record deleted' });
		} catch (error) {
			console.log(error)
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })
		}
	}
}

export default ProductController;