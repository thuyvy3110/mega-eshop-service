"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Stores_1 = require("../models/entities/Stores");
var Scenario_repository_1 = require("../repositories/Scenario.repository");
var ScenarioInitialMovies_repository_1 = require("../repositories/ScenarioInitialMovies.repository");
var ScenarioTrees_repository_1 = require("../repositories/ScenarioTrees.repository");
var Store_repository_1 = require("../repositories/Store.repository");
var StoreSalesPerson_repository_1 = require("../repositories/StoreSalesPerson.repository");
var Storage_utils_1 = require("../utils/Storage.utils");
var Base_controller_1 = require("./Base.controller");
var express_validator_1 = require("express-validator");
var StoreController = (function (_super) {
    tslib_1.__extends(StoreController, _super);
    function StoreController() {
        var _this = _super.call(this, Stores_1.Stores, '/vs/stores') || this;
        _this.getActiveStore = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var client, clientId, record, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.findClientObject(request)];
                    case 1:
                        client = _a.sent();
                        clientId = client.parentClientId == 0 ? client.id : client.parentClientId;
                        return [4, this.repository.findActiveStore(clientId)];
                    case 2:
                        record = _a.sent();
                        return [2, response.status(200).json(record)];
                    case 3:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 4: return [2];
                }
            });
        }); };
        _this.getActiveStoreOfSalePerson = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var account, salePerson, storeSalePersons, storeIds, record, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4, this.findUsernameInRequest(request)];
                    case 1:
                        account = _a.sent();
                        return [4, this.findSalePersonByAccount(account)];
                    case 2:
                        salePerson = _a.sent();
                        if (!salePerson) {
                            return [2, response.status(200).json([])];
                        }
                        return [4, this.storeSalePersonRepository.findBySalePersonId(salePerson.id)];
                    case 3:
                        storeSalePersons = _a.sent();
                        storeIds = storeSalePersons.map(function (s) { return s.storeId; }) || [];
                        if (storeIds.length == 0) {
                            return [2, response.status(200).json([])];
                        }
                        return [4, this.storeRepository.findByIds(storeIds)];
                    case 4:
                        record = _a.sent();
                        return [2, response.status(200).json(record)];
                    case 5:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 6: return [2];
                }
            });
        }); };
        _this.save = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var clientId, account, storeId, isNew, record, store, data, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findClientId(request)];
                    case 1:
                        clientId = _a.sent();
                        return [4, this.findUsernameInRequest(request)];
                    case 2:
                        account = _a.sent();
                        storeId = request.body.storeId;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 9, , 10]);
                        isNew = Number(request.body.storeId) > 0 ? false : true;
                        record = void 0;
                        if (!isNew) return [3, 4];
                        record = new Stores_1.Stores();
                        record.createdBy = account;
                        record.updatedBy = account;
                        return [3, 6];
                    case 4: return [4, this.repository.findOneById(request.body.storeId)];
                    case 5:
                        record = _a.sent();
                        if (!record) {
                            return [2, response.status(404).json({ message: 'Store not found' })];
                        }
                        record.updatedBy = account;
                        _a.label = 6;
                    case 6:
                        record.storeName = request.body.storeName;
                        record.address = request.body.address;
                        record.clientId = clientId;
                        record.officer = request.body.officer;
                        record.memo = request.body.memo;
                        record.contactInformation = request.body.contactInformation;
                        return [4, this.repository.upsert(record)];
                    case 7:
                        store = _a.sent();
                        return [4, this.repository.upsert(store)];
                    case 8:
                        data = _a.sent();
                        return [2, response.status(200).json({ status: 'success', respStoreData: data })];
                    case 9:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2, response.status(500).json({ status: 'error', err_code: this.errCode.ERROR_RESPONSE })];
                    case 10: return [2];
                }
            });
        }); };
        _this.scenarioTreesRepository = new ScenarioTrees_repository_1.ScenarioTreesRepository();
        _this.scenarioInitialMovieRepository = new ScenarioInitialMovies_repository_1.ScenarioInitialMoviesRepository();
        _this.scenarioRepository = new Scenario_repository_1.ScenarioRepository();
        _this.storeRepository = new Store_repository_1.StoreRepository;
        _this.storeSalePersonRepository = new StoreSalesPerson_repository_1.StoreSalespersonsRepository();
        return _this;
    }
    StoreController.prototype.initRepository = function () {
        return new Store_repository_1.StoreRepository();
    };
    StoreController.prototype.customRoutes = function () {
        var _this = this;
        this.router.get(this.path + '/active', function (req, res) { return _this.getActiveStore(req, res); });
        this.router.get(this.path + '/active-of-saleperson', function (req, res) { return _this.getActiveStoreOfSalePerson(req, res); });
        this.router.get(this.path + '/:id/scenario', function (req, res) { return _this.getScenarioTreeByStore(req, res); });
        this.router.put(this.path, [
            express_validator_1.body('storeName').notEmpty().isString(),
            express_validator_1.body('address').notEmpty().isString(),
            express_validator_1.body('officer').notEmpty().isString(),
            express_validator_1.body('memo').notEmpty().isString(),
            express_validator_1.body('contactInformation').notEmpty().isString()
        ], function (req, res) { return _this.save(req, res); });
        this.router.post(this.path, [
            express_validator_1.body('storeName').notEmpty().isString(),
            express_validator_1.body('address').notEmpty().isString(),
            express_validator_1.body('officer').notEmpty().isString(),
            express_validator_1.body('memo').notEmpty().isString(),
            express_validator_1.body('contactInformation').notEmpty().isString()
        ], function (req, res) { return _this.save(req, res); });
    };
    StoreController.prototype.find = function (request, response) {
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
                        return [4, typeorm_1.getRepository(this.entity).createQueryBuilder()
                                .where('client_id = :client_id', { client_id: clientId })
                                .orderBy('updated_at', 'DESC', 'NULLS LAST')
                                .orderBy('created_at', 'DESC')
                                .getMany()];
                    case 3:
                        entities = _a.sent();
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
    StoreController.prototype.getScenarioTreeByStore = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sce, id, trees, i, _a, initialNode, _b, _c, error_5;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 11, , 12]);
                        return [4, this.storeRepository.findScenarioFromStore(+request.params.id)];
                    case 1:
                        sce = _d.sent();
                        if (!sce) {
                            return [2, response.status(404).json({ message: 'No Data' })];
                        }
                        id = sce.id;
                        return [4, this.scenarioTreesRepository.find({
                                where: {
                                    'scenarioId': id
                                }
                            })];
                    case 2:
                        trees = _d.sent();
                        i = 0;
                        _d.label = 3;
                    case 3:
                        if (!(i < trees.length)) return [3, 6];
                        trees[i].nodeId = trees[i].id;
                        if (!trees[i].value.startsWith('demo/')) return [3, 5];
                        _a = trees[i];
                        return [4, Storage_utils_1.getFileFromS3(trees[i].value)];
                    case 4:
                        _a.value = _d.sent();
                        _d.label = 5;
                    case 5:
                        ++i;
                        return [3, 3];
                    case 6:
                        sce.scenarioTrees = trees;
                        return [4, this.scenarioInitialMovieRepository
                                .repository
                                .createQueryBuilder()
                                .where('scenario_id = :sc', { sc: id })
                                .getOne()];
                    case 7:
                        initialNode = _d.sent();
                        if (!initialNode) return [3, 10];
                        _b = initialNode;
                        return [4, Storage_utils_1.getFileFromS3(initialNode.movie_1st)];
                    case 8:
                        _b.movie_1st = _d.sent();
                        _c = initialNode;
                        return [4, Storage_utils_1.getFileFromS3(initialNode.movie_2nd)];
                    case 9:
                        _c.movie_2nd = _d.sent();
                        sce.scenarioInitialMovies = initialNode;
                        _d.label = 10;
                    case 10: return [2, response.status(200).json(sce)];
                    case 11:
                        error_5 = _d.sent();
                        console.log(error_5);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 12: return [2];
                }
            });
        });
    };
    StoreController.prototype.delete = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                try {
                    console.log('StoreSalespersonsController - delete by store Id: ' + request.params.id);
                    request.params.id
                        .split(',')
                        .map(function (id) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, this.repository.deleteByStoreId(Number(id))];
                                case 1:
                                    _a.sent();
                                    return [2];
                            }
                        });
                    }); });
                    return [2, response.status(200).json({ message: 'Record deleted' })];
                }
                catch (error) {
                    console.log(error);
                    return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                }
                return [2];
            });
        });
    };
    return StoreController;
}(Base_controller_1.BaseController));
exports.default = StoreController;
//# sourceMappingURL=Store.controller.js.map