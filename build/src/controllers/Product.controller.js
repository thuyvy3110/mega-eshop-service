"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var csv_parser_1 = tslib_1.__importDefault(require("csv-parser"));
var express_validator_1 = require("express-validator");
var fs_1 = tslib_1.__importDefault(require("fs"));
var lodash_1 = tslib_1.__importDefault(require("lodash"));
var typeorm_1 = require("typeorm");
var ProductImgs_1 = require("../models/entities/ProductImgs");
var Products_1 = require("../models/entities/Products");
var ProductImgs_repository_1 = require("../repositories/ProductImgs.repository");
var Products_repository_1 = require("../repositories/Products.repository");
var Base_controller_1 = require("./Base.controller");
var ProductController = (function (_super) {
    tslib_1.__extends(ProductController, _super);
    function ProductController() {
        var _this = _super.call(this, Products_1.Products, '/vs/product') || this;
        _this.save = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var clientId, account, errors, data, isNew, record, product, productImgs, _loop_1, this_1, _i, _a, fieldName, error_1;
            var _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, this.findClientId(request)];
                    case 1:
                        clientId = _c.sent();
                        return [4, this.findUsernameInRequest(request)];
                    case 2:
                        account = _c.sent();
                        errors = express_validator_1.validationResult(request);
                        if (!errors.isEmpty()) {
                            return [2, response.status(400).json({ errors: errors.array() })];
                        }
                        data = request.body;
                        _c.label = 3;
                    case 3:
                        _c.trys.push([3, 13, , 14]);
                        isNew = Number(data.id) > 0 ? false : true;
                        record = void 0;
                        if (!isNew) return [3, 4];
                        record = new Products_1.Products();
                        record.createdBy = account;
                        return [3, 6];
                    case 4: return [4, this.repository.findOneById(data.id, { relations: ['productImgs'] })];
                    case 5:
                        record = _c.sent();
                        if (!record) {
                            return [2, response.status(400).json({ status: 'error', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND })];
                        }
                        _c.label = 6;
                    case 6:
                        record.productName = data.productName;
                        record.categoryId = data.categoryId;
                        record.companyName = data.companyName;
                        record.price = data.price;
                        record.url = data.url;
                        record.description = data.description;
                        record.memo = data.memo;
                        record.clientId = clientId;
                        record.updatedBy = account;
                        return [4, this.repository.upsert(record)];
                    case 7:
                        product = _c.sent();
                        productImgs = [];
                        _loop_1 = function (fieldName) {
                            var productImg;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        productImg = void 0;
                                        if (isNew) {
                                            productImg = new ProductImgs_1.ProductImgs();
                                            productImg.productId = product.id;
                                            productImg.fieldName = fieldName;
                                            productImg.img = '';
                                            productImg.createdBy = account;
                                            productImg.updatedBy = account;
                                        }
                                        else {
                                            productImg = (_b = record === null || record === void 0 ? void 0 : record.productImgs) === null || _b === void 0 ? void 0 : _b.filter(function (img) { return img.fieldName === fieldName; })[0];
                                            if (!productImg) {
                                                productImg = new ProductImgs_1.ProductImgs();
                                                productImg.productId = product.id;
                                                productImg.fieldName = fieldName;
                                                productImg.img = '';
                                                productImg.createdBy = account;
                                                productImg.updatedBy = account;
                                            }
                                        }
                                        return [4, this_1.uploadHandler(productImg, request, fieldName, 'product_id_' + product.id + '_' + fieldName, data[fieldName])];
                                    case 1:
                                        _a.sent();
                                        productImgs.push(productImg);
                                        return [2];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, _a = ['image1', 'image2', 'image3', 'image4', 'image5'];
                        _c.label = 8;
                    case 8:
                        if (!(_i < _a.length)) return [3, 11];
                        fieldName = _a[_i];
                        return [5, _loop_1(fieldName)];
                    case 9:
                        _c.sent();
                        _c.label = 10;
                    case 10:
                        _i++;
                        return [3, 8];
                    case 11: return [4, this.productImgsRepository.upserts(productImgs)];
                    case 12:
                        _c.sent();
                        return [2, response.status(200).json({ status: 'success', message: 'Success' })];
                    case 13:
                        error_1 = _c.sent();
                        console.log(error_1);
                        return [2, response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_RESPONSE })];
                    case 14: return [2];
                }
            });
        }); };
        _this.bulkInsertByCsvFile = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var fieldName, file, filePath, csvData_1, readStream_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                fieldName = 'csvFile';
                if (request.files && request.files[fieldName]) {
                    file = request.files[fieldName];
                    filePath = file.tempFilePath;
                    if ((file === null || file === void 0 ? void 0 : file.name.indexOf('.csv')) === -1) {
                        return [2, response.status(400).json({ status: 'error', err_code: this.errCode.ERROR_RESPONSE })];
                    }
                    csvData_1 = [];
                    try {
                        readStream_1 = fs_1.default.createReadStream(filePath)
                            .pipe(csv_parser_1.default(['id', 'productName', 'clientId', 'categoryId', 'companyName', 'price', 'url', 'description', 'memo', 'updatedBy', 'updatedAt', 'createdBy', 'createdAt']))
                            .on('data', function (row) {
                            console.log(row);
                            csvData_1.push(row);
                        })
                            .on('end', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var error_2;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        console.log(csvData_1);
                                        readStream_1.destroy();
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4, this.repository.upserts(csvData_1)];
                                    case 2:
                                        _a.sent();
                                        return [2, response.status(200).json({ status: 'success', message: 'Success' })];
                                    case 3:
                                        error_2 = _a.sent();
                                        console.log(error_2.code);
                                        return [2, response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_RESPONSE })];
                                    case 4: return [2];
                                }
                            });
                        }); })
                            .on('error', function (error) {
                            console.log(error);
                        });
                    }
                    catch (error) {
                        console.log(error);
                        return [2, response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_RESPONSE })];
                    }
                }
                else {
                    return [2, response.status(400).json({ status: 'error', err_code: this.errCode.ERROR_RESPONSE })];
                }
                return [2];
            });
        }); };
        _this.productImgsRepository = new ProductImgs_repository_1.ProductImgsRepository();
        return _this;
    }
    ProductController.prototype.initRepository = function () {
        return new Products_repository_1.ProductRepository();
    };
    ProductController.prototype.customRoutes = function () {
        var _this = this;
        this.router.put(this.path, [
            express_validator_1.body('id').notEmpty().isString(),
            express_validator_1.body('productName').notEmpty().isString().isLength({ max: 200 }),
            express_validator_1.body('categoryId').notEmpty(),
            express_validator_1.body('companyName').notEmpty().isString().isLength({ max: 100 }),
            express_validator_1.body('price').notEmpty().isString().isLength({ max: 100 }),
            express_validator_1.body('url').notEmpty().isString().isLength({ max: 100 }),
        ], function (req, res) { return _this.save(req, res); });
        this.router.post(this.path, [
            express_validator_1.body('productName').notEmpty().isString().isLength({ max: 200 }),
            express_validator_1.body('categoryId').notEmpty(),
            express_validator_1.body('companyName').notEmpty().isString().isLength({ max: 100 }),
            express_validator_1.body('price').notEmpty().isString().isLength({ max: 100 }),
            express_validator_1.body('url').notEmpty().isString().isLength({ max: 100 }),
        ], function (req, res) { return _this.save(req, res); });
        this.router.post(this.path + '/bulk-insert', function (req, res) { return _this.bulkInsertByCsvFile(req, res); });
    };
    ProductController.prototype.paginate = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var clientId, entities, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findClientId(request)];
                    case 1:
                        clientId = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        if (lodash_1.default.isEmpty(request.query)) {
                            return [2, response.status(400).json({ message: 'Bad Request' })];
                        }
                        console.log('Paginate params: ', request.query);
                        return [4, typeorm_1.getRepository(this.entity)
                                .createQueryBuilder('products')
                                .leftJoinAndSelect('products.category', 'categories')
                                .where('products.clientId = :client_id', { client_id: clientId })
                                .orderBy('products.updatedAt', 'DESC')
                                .paginate()];
                    case 3:
                        entities = _a.sent();
                        return [2, response.status(200).json(entities)];
                    case 4:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 5: return [2];
                }
            });
        });
    };
    ProductController.prototype.findOne = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var record, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('FindOne params: ', request.params.id);
                        return [4, this.repository.findOneById(request.params.id, { relations: ['productImgs'] })];
                    case 1:
                        record = _a.sent();
                        if (lodash_1.default.isEmpty(record)) {
                            return [2, response.status(400).json({ status: 'error', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND })];
                        }
                        return [2, response.status(200).json(record)];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 3: return [2];
                }
            });
        });
    };
    ProductController.prototype.uploadHandler = function (record, req, field, key, defaultValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.files && req.files[field])) return [3, 2];
                        return [4, this.upload(req, field, key)];
                    case 1:
                        defaultValue = _a.sent();
                        _a.label = 2;
                    case 2:
                        record.img = defaultValue;
                        return [2];
                }
            });
        });
    };
    ProductController.prototype.delete = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (lodash_1.default.isEmpty(request.params.id)) {
                            return [2, response.status(400).json({ status: 'error', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND })];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        console.log('BaseController - delete: ' + request);
                        return [4, this.productImgsRepository.delete({ 'productId': +request.params.id })];
                    case 2:
                        _a.sent();
                        return [4, this.repository.delete(request.params.id)];
                    case 3:
                        _a.sent();
                        return [2, response.status(200).json({ message: 'Record deleted' })];
                    case 4:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 5: return [2];
                }
            });
        });
    };
    return ProductController;
}(Base_controller_1.BaseController));
exports.default = ProductController;
//# sourceMappingURL=Product.controller.js.map