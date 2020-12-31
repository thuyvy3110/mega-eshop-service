"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var express_validator_1 = require("express-validator");
var lodash_1 = tslib_1.__importDefault(require("lodash"));
var typeorm_1 = require("typeorm");
var Salespersons_1 = require("../models/entities/Salespersons");
var SalesPerson_repository_1 = require("../repositories/SalesPerson.repository");
var SalespersonsAreas_repository_1 = require("../repositories/SalespersonsAreas.repository");
var Base_controller_1 = require("./Base.controller");
var SalespersonsController = (function (_super) {
    tslib_1.__extends(SalespersonsController, _super);
    function SalespersonsController() {
        var _this = _super.call(this, Salespersons_1.SalePerson, '/vs/salespersons') || this;
        _this.save = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var clientId, account, errors, data, isNew, record, sp, saleAreaIds, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findClientId(request)];
                    case 1:
                        clientId = _a.sent();
                        return [4, this.findUsernameInRequest(request)];
                    case 2:
                        account = _a.sent();
                        errors = express_validator_1.validationResult(request);
                        if (!errors.isEmpty()) {
                            return [2, response.status(400).json({ errors: errors.array() })];
                        }
                        data = request.body;
                        if (!data.evaluation || +data.evaluation < 0 || +data.evaluation > 5) {
                            return [2, response.status(500).json({ status: 'evaluation invalid', err_code: this.errCode.ERROR_INVALID_AGRUMENT })];
                        }
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 11, , 12]);
                        isNew = Number(data.id) > 0 ? false : true;
                        record = void 0;
                        if (!isNew) return [3, 4];
                        record = new Salespersons_1.SalePerson();
                        record.createdBy = account;
                        record.clientId = clientId;
                        return [3, 6];
                    case 4: return [4, this.repository.findOneById(data.id)];
                    case 5:
                        record = _a.sent();
                        if (!record) {
                            return [2, response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND })];
                        }
                        _a.label = 6;
                    case 6:
                        record.name = data.name;
                        record.account = data.account;
                        record.evaluation = data.evaluation;
                        record.company = data.company;
                        record.contactInformation = data.contactInformation;
                        record.officer = data.officer;
                        record.categoryId = data.categoryId;
                        record.memo = data.memo;
                        record.area = data.area;
                        record.updatedBy = account;
                        return [4, this.repository.upsert(record)];
                    case 7:
                        sp = _a.sent();
                        return [4, this.salespersonsAreasRepository.deleteBySalespersonId(sp.id)];
                    case 8:
                        _a.sent();
                        saleAreaIds = request.body.saleAreaIds;
                        if (!!lodash_1.default.isEmpty(saleAreaIds)) return [3, 10];
                        return [4, this.salespersonsAreasRepository.saveBySalespersonId(sp.id, saleAreaIds, account)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [2, response.status(200).json({ status: 'success', message: 'Success' })];
                    case 11:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2, response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_RESPONSE })];
                    case 12: return [2];
                }
            });
        }); };
        _this.getDataMethod = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var token, data, error_2;
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        token = (_a = request.get('Authorization')) === null || _a === void 0 ? void 0 : _a.toString().replace('Bearer ', '');
                        return [4, this.repository.getUserInfoByJwt(token)];
                    case 1:
                        data = _b.sent();
                        return [2, response.status(200).json(data)];
                    case 2:
                        error_2 = _b.sent();
                        console.log(error_2);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 3: return [2];
                }
            });
        }); };
        _this.getSalespersonByClientId = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var client, clientId, data, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findClientObject(request)];
                    case 1:
                        client = _a.sent();
                        clientId = client.parentClientId == 0 ? client.id : client.parentClientId;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, this.repository.getSalespersonByClientId(clientId)];
                    case 3:
                        data = _a.sent();
                        return [2, response.status(200).json(data)];
                    case 4:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 5: return [2];
                }
            });
        }); };
        _this.salespersonsAreasRepository = new SalespersonsAreas_repository_1.SalespersonsAreasRepository();
        return _this;
    }
    SalespersonsController.prototype.initRepository = function () {
        return new SalesPerson_repository_1.SalespersonRepository();
    };
    SalespersonsController.prototype.customRoutes = function () {
        var _this = this;
        this.router.put(this.path, [
            express_validator_1.body('id').notEmpty().isString(),
            express_validator_1.body('name').notEmpty().isString().isLength({ max: 100 }),
            express_validator_1.body('account').notEmpty().isString().isLength({ max: 100 }),
            express_validator_1.body('evaluation').notEmpty().isLength({ max: 10 }),
            express_validator_1.body('company').notEmpty().isString().isLength({ max: 100 }),
            express_validator_1.body('officer').notEmpty().isString().isLength({ max: 100 }),
            express_validator_1.body('contactInformation').notEmpty().isString().isLength({ max: 200 }),
        ], function (req, res) { return _this.save(req, res); });
        this.router.post(this.path, [
            express_validator_1.body('name').notEmpty().isString().isLength({ max: 100 }),
            express_validator_1.body('account').notEmpty().isString().isLength({ max: 100 }),
            express_validator_1.body('evaluation').notEmpty().isLength({ max: 10 }),
            express_validator_1.body('company').notEmpty().isString().isLength({ max: 100 }),
            express_validator_1.body('officer').notEmpty().isString().isLength({ max: 100 }),
            express_validator_1.body('contactInformation').notEmpty().isString().isLength({ max: 200 }),
        ], function (req, res) { return _this.save(req, res); });
        this.router.get(this.path + '/getUserInfoByJwt/routes', function (req, res) { return _this.getDataMethod(req, res); });
        this.router.get(this.path + '/getSalespersonByClientId', function (req, res) { return _this.getSalespersonByClientId(req, res); });
    };
    SalespersonsController.prototype.paginate = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var clientId, entities, error_4;
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
                                .createQueryBuilder('salespersons')
                                .leftJoinAndSelect('salespersons.category', 'categories')
                                .leftJoinAndSelect('salespersons.salespersonsAreas', 'salespersonsAreas')
                                .leftJoinAndSelect('salespersonsAreas.saleArea', 'saleAreas')
                                .where('salespersons.clientId = :client_id', { client_id: clientId })
                                .orderBy('salespersons.updatedAt', 'DESC')
                                .paginate()];
                    case 3:
                        entities = _a.sent();
                        if (!lodash_1.default.isEmpty(entities)) {
                            entities === null || entities === void 0 ? void 0 : entities.data.forEach(function (sp) {
                                var _a;
                                var saleAreas = sp.salespersonsAreas ? sp.salespersonsAreas.map(function (x) { var _a; return (_a = x.saleArea) === null || _a === void 0 ? void 0 : _a.area; }) : [];
                                sp = Object.assign(sp, {
                                    saleAreas: saleAreas,
                                    salespersonsAreas: undefined,
                                    specialtyCategory: (_a = sp.category) === null || _a === void 0 ? void 0 : _a.campaignCategoryName,
                                    category: undefined
                                });
                            });
                        }
                        return [2, response.status(200).json(entities)];
                    case 4:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 5: return [2];
                }
            });
        });
    };
    SalespersonsController.prototype.findOne = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var record, saleAreas, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('FindOne params: ', request.params.id);
                        return [4, this.repository.findOneById(request.params.id, { relations: ['category', 'salespersonsAreas', 'salespersonsAreas.saleArea'] })];
                    case 1:
                        record = _a.sent();
                        if (record) {
                            saleAreas = record.salespersonsAreas ? record.salespersonsAreas.map(function (x) { return x.saleArea; }) : [];
                            Object.assign(record, { saleAreas: saleAreas, salespersonsAreas: undefined });
                            return [2, response.status(200).json(record)];
                        }
                        return [2, response.status(400).json({ status: 'error', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND })];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 3: return [2];
                }
            });
        });
    };
    SalespersonsController.prototype.delete = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (lodash_1.default.isEmpty(request.params.id)) {
                            return [2, response.status(400).json({ status: 'error', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND })];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4, this.salespersonsAreasRepository.deleteBySalespersonId(+request.params.id)];
                    case 2:
                        _a.sent();
                        return [4, this.repository.delete(request.params.id)];
                    case 3:
                        _a.sent();
                        return [2, response.status(200).json({ message: 'Record deleted' })];
                    case 4:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 5: return [2];
                }
            });
        });
    };
    return SalespersonsController;
}(Base_controller_1.BaseController));
exports.default = SalespersonsController;
//# sourceMappingURL=SalesPerson.controller.js.map