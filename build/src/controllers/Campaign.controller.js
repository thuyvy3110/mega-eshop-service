"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignStatus = void 0;
var tslib_1 = require("tslib");
var lodash_1 = tslib_1.__importDefault(require("lodash"));
var Campaigns_1 = require("../models/entities/Campaigns");
var Campaign_repository_1 = require("../repositories/Campaign.repository");
var Product_repository_1 = require("../repositories/Product.repository");
var Store_repository_1 = require("../repositories/Store.repository");
var Categories_repository_1 = require("../repositories/Categories.repository");
var CampaignStore_repository_1 = require("../repositories/CampaignStore.repository");
var CampaignProduct_repository_1 = require("../repositories/CampaignProduct.repository");
var Base_controller_1 = require("./Base.controller");
var express_validator_1 = require("express-validator");
var Storage_utils_1 = require("../utils/Storage.utils");
exports.campaignStatus = {
    active: '1',
    inactive: '0'
};
var CampaignController = (function (_super) {
    tslib_1.__extends(CampaignController, _super);
    function CampaignController() {
        var _this = _super.call(this, Campaigns_1.Campaigns, '/vs/campaigns') || this;
        _this.save = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var clientId, account, errors, storeIds, isActive, productIds, isNew, record, campaign, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findClientId(request)];
                    case 1:
                        clientId = _a.sent();
                        return [4, this.findUsernameInRequest(request)];
                    case 2:
                        account = _a.sent();
                        errors = express_validator_1.validationResult(request);
                        storeIds = request.body.storeIds;
                        isActive = request.body.status === exports.campaignStatus.active;
                        if (isActive && lodash_1.default.isEmpty(storeIds)) {
                            return [2, response.status(500).json({ err_code: this.errCode.ERROR_MISSING_STORE_ID })];
                        }
                        if (!errors.isEmpty()) {
                            return [2, response.status(400).json({ errors: errors.array() })];
                        }
                        if (storeIds) {
                            storeIds = storeIds.split(',');
                        }
                        productIds = request.body.productIds.split(',');
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 20, , 21]);
                        isNew = Number(request.body.id) > 0 ? false : true;
                        record = void 0;
                        if (!isNew) return [3, 4];
                        record = new Campaigns_1.Campaigns();
                        record.createdBy = account;
                        record.updatedBy = account;
                        return [3, 6];
                    case 4: return [4, this.repository.findOneById(request.body.id)];
                    case 5:
                        record = _a.sent();
                        if (!record) {
                            return [2, response.status(404).json({ message: 'Campaign not found' })];
                        }
                        record.updatedBy = account;
                        _a.label = 6;
                    case 6:
                        record.campaignName = request.body.campaignName;
                        record.categoryId = request.body.categoryId;
                        record.clientId = clientId;
                        record.content = request.body.content;
                        record.status = request.body.status || exports.campaignStatus.inactive;
                        record.startDate = request.body.startDate;
                        record.endDate = request.body.endDate;
                        record.goods = request.body.goods;
                        record.periods = request.body.periods;
                        record.dueDate = request.body.dueDate;
                        return [4, this.repository.upsert(record)];
                    case 7:
                        campaign = _a.sent();
                        if (!!lodash_1.default.isEmpty(productIds)) return [3, 10];
                        return [4, this.campaignProductRepository.delete(campaign.id)];
                    case 8:
                        _a.sent();
                        return [4, this.campaignProductRepository.save(campaign.id, productIds, account)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        if (!(request.body.status === exports.campaignStatus.active)) return [3, 13];
                        return [4, this.campaignStoreRepository.delete(campaign.id)];
                    case 11:
                        _a.sent();
                        return [4, this.campaignStoreRepository.save(campaign.id, storeIds, account)];
                    case 12:
                        _a.sent();
                        _a.label = 13;
                    case 13: return [4, this.uploadHandler(campaign, request, 'image1', 'campaign_' + campaign.id + '_image1', request.body.image1)];
                    case 14:
                        _a.sent();
                        return [4, this.uploadHandler(campaign, request, 'image2', 'campaign_' + campaign.id + '_image2', request.body.image2)];
                    case 15:
                        _a.sent();
                        return [4, this.uploadHandler(campaign, request, 'image3', 'campaign_' + campaign.id + '_image3', request.body.image3)];
                    case 16:
                        _a.sent();
                        return [4, this.uploadHandler(campaign, request, 'image4', 'campaign_' + campaign.id + '_image4', request.body.image4)];
                    case 17:
                        _a.sent();
                        return [4, this.uploadHandler(campaign, request, 'image5', 'campaign_' + campaign.id + '_image5', request.body.image5)];
                    case 18:
                        _a.sent();
                        return [4, this.repository.upsert(campaign)];
                    case 19:
                        _a.sent();
                        return [2, response.status(200).json({ status: 'success', message: 'Success' })];
                    case 20:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2, response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_RESPONSE })];
                    case 21: return [2];
                }
            });
        }); };
        _this.getAll = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var clientId, campaigns, campaigns, campaignsInactive, campaignsActive, error_2;
            var _a, _b;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4, this.findClientId(request)];
                    case 1:
                        clientId = _c.sent();
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 9, , 10]);
                        if (!(((_a = request.query) === null || _a === void 0 ? void 0 : _a.types) === 'active')) return [3, 4];
                        return [4, this.repository.getStatusActiveList(clientId)];
                    case 3:
                        campaigns = _c.sent();
                        return [2, response.status(200).json({ types: 'active', data: campaigns })];
                    case 4:
                        if (!(((_b = request.query) === null || _b === void 0 ? void 0 : _b.types) === 'inactive')) return [3, 6];
                        return [4, this.repository.getStatusInActiveList(clientId)];
                    case 5:
                        campaigns = _c.sent();
                        return [2, response.status(200).json({ types: 'inactive', data: campaigns })];
                    case 6: return [4, this.repository.getStatusInActiveList(clientId)];
                    case 7:
                        campaignsInactive = _c.sent();
                        return [4, this.repository.getStatusActiveList(clientId)];
                    case 8:
                        campaignsActive = _c.sent();
                        return [2, response.status(200).json({ types: 'all', campaignsActive: campaignsActive, campaignsInactive: campaignsInactive })];
                    case 9:
                        error_2 = _c.sent();
                        console.log(error_2);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 10: return [2];
                }
            });
        }); };
        _this.findById = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var campaign, _a, _b, _c, _d, _e, error_3;
            var _f;
            return tslib_1.__generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 8, , 9]);
                        return [4, this.repository.getOne(request.params)];
                    case 1:
                        campaign = _g.sent();
                        if (lodash_1.default.isEmpty(campaign)) {
                            return [2, response.status(404).json({ message: 'No Data' })];
                        }
                        if (!(((_f = request.query) === null || _f === void 0 ? void 0 : _f.type) == 'public')) return [3, 7];
                        _a = campaign;
                        return [4, Storage_utils_1.getFileFromS3(campaign.image1)];
                    case 2:
                        _a.image1 = _g.sent();
                        _b = campaign;
                        return [4, Storage_utils_1.getFileFromS3(campaign.image2)];
                    case 3:
                        _b.image2 = _g.sent();
                        _c = campaign;
                        return [4, Storage_utils_1.getFileFromS3(campaign.image3)];
                    case 4:
                        _c.image3 = _g.sent();
                        _d = campaign;
                        return [4, Storage_utils_1.getFileFromS3(campaign.image4)];
                    case 5:
                        _d.image4 = _g.sent();
                        _e = campaign;
                        return [4, Storage_utils_1.getFileFromS3(campaign.image5)];
                    case 6:
                        _e.image5 = _g.sent();
                        _g.label = 7;
                    case 7: return [2, response.status(200).json(campaign)];
                    case 8:
                        error_3 = _g.sent();
                        console.log(error_3);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 9: return [2];
                }
            });
        }); };
        _this.updateStatus = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var errors, id, status, campaign, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errors = express_validator_1.validationResult(request);
                        if (!errors.isEmpty()) {
                            return [2, response.status(200).json({ errors: errors.array() })];
                        }
                        id = request.body.id;
                        status = request.body.status;
                        return [4, this.repository.findOneById(id)];
                    case 1:
                        campaign = _a.sent();
                        if (!!lodash_1.default.isEmpty(campaign)) return [3, 7];
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        return [4, this.repository.updateStatus({ id: id, status: status })];
                    case 3:
                        _a.sent();
                        if (!(status === '0')) return [3, 5];
                        return [4, this.campaignStoreRepository.delete(id)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2, response.status(200).json({ status: 'success', message: 'Success' })];
                    case 6:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 7: return [2, response.status(400).json({ message: 'Bad Request' })];
                }
            });
        }); };
        _this.getAllCategories = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var clientId, storeAll, storeList, productList, categories, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findClientId(request)];
                    case 1:
                        clientId = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 7, , 8]);
                        return [4, this.storeRepository.getAll(clientId)];
                    case 3:
                        storeAll = _a.sent();
                        return [4, this.storeRepository.getById(clientId)];
                    case 4:
                        storeList = _a.sent();
                        return [4, this.productRepository.get(clientId)];
                    case 5:
                        productList = _a.sent();
                        return [4, this.categoriesRepository.getTypeCampaign(clientId)];
                    case 6:
                        categories = _a.sent();
                        return [2, response.status(200).json({ storeAll: storeAll, storeList: storeList, productList: productList, categories: categories })];
                    case 7:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 8: return [2];
                }
            });
        }); };
        _this.campaignStoreRepository = new CampaignStore_repository_1.CampaignStoreRepository();
        _this.campaignProductRepository = new CampaignProduct_repository_1.CampaignProductRepository();
        _this.productRepository = new Product_repository_1.ProductRepository();
        _this.storeRepository = new Store_repository_1.StoreRepository();
        _this.categoriesRepository = new Categories_repository_1.CategoriesRepository();
        return _this;
    }
    CampaignController.prototype.initRepository = function () {
        return new Campaign_repository_1.CampaignRepository();
    };
    CampaignController.prototype.customRoutes = function () {
        var _this = this;
        this.router.put(this.path + '/status', [
            express_validator_1.body('id').notEmpty().isString(),
            express_validator_1.body('status').notEmpty().isString()
        ], function (req, res) { return _this.updateStatus(req, res); });
        this.router.put(this.path, [
            express_validator_1.body('id').notEmpty().isString(),
            express_validator_1.body('campaignName').notEmpty().isString().isLength({ max: 100 }),
            express_validator_1.body('categoryId').notEmpty().isString(),
            express_validator_1.body('status').notEmpty().isString(),
            express_validator_1.body('startDate').notEmpty().isString(),
            express_validator_1.body('endDate')
                .notEmpty()
                .isString()
                .custom(function (value, _a) {
                var req = _a.req;
                return value > req.body.startDate;
            }),
            express_validator_1.body('productIds').notEmpty(),
            express_validator_1.body('storeIds'),
        ], function (req, res) { return _this.save(req, res); });
        this.router.post(this.path, [
            express_validator_1.body('campaignName').notEmpty().isString().isLength({ max: 100 }),
            express_validator_1.body('categoryId').notEmpty().isString(),
            express_validator_1.body('status').notEmpty().isString(),
            express_validator_1.body('startDate').notEmpty().isString(),
            express_validator_1.body('endDate')
                .notEmpty()
                .isString()
                .custom(function (value, _a) {
                var req = _a.req;
                return value > req.body.startDate;
            }),
            express_validator_1.body('productIds').notEmpty(),
        ], function (req, res) { return _this.save(req, res); });
        this.router.get(this.path + '/categories', function (req, res) { return _this.getAllCategories(req, res); });
        this.router.get(this.path + '/:id', function (req, res) { return _this.findById(req, res); });
        this.router.get(this.path + '/:clientId/list', function (req, res) { return _this.getAll(req, res); });
    };
    CampaignController.prototype.uploadHandler = function (record, req, field, key, defaultValue) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uploadResult;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(req.files && req.files[field])) return [3, 2];
                        return [4, this.upload(req, field, key)];
                    case 1:
                        uploadResult = _a.sent();
                        this.assignProperty(record, field, uploadResult);
                        return [3, 3];
                    case 2:
                        this.assignProperty(record, field, defaultValue);
                        _a.label = 3;
                    case 3: return [2];
                }
            });
        });
    };
    return CampaignController;
}(Base_controller_1.BaseController));
exports.default = CampaignController;
//# sourceMappingURL=Campaign.controller.js.map