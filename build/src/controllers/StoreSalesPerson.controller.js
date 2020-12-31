"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var StoreSalespersons_1 = require("../models/entities/StoreSalespersons");
var StoreSalesPerson_repository_1 = require("../repositories/StoreSalesPerson.repository");
var Base_controller_1 = require("./Base.controller");
var StoreSalespersonsController = (function (_super) {
    tslib_1.__extends(StoreSalespersonsController, _super);
    function StoreSalespersonsController() {
        var _this = _super.call(this, StoreSalespersons_1.StoreSalespersons, '/vs/store-and-salesperson') || this;
        _this.find = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var client, records, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findClientObject(request)];
                    case 1:
                        client = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        console.log('BaseController - find: ' + request);
                        return [4, this.repository.findByClientId(client.parentClientId == 0 ? client.id : client.parentClientId)];
                    case 3:
                        records = _a.sent();
                        return [2, response.status(200).json(records)];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 5: return [2];
                }
            });
        }); };
        _this.getActiveSalePerson = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var storeId, id, record, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        storeId = Number(request.params.id);
                        return [4, this.findParentClientIdFirst(request)];
                    case 1:
                        id = _a.sent();
                        return [4, this.repository.findActiveSalePersonInStore(storeId, id)];
                    case 2:
                        record = _a.sent();
                        return [2, response.status(200).json(record)];
                    case 3:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 4: return [2];
                }
            });
        }); };
        _this.getInActiveSalePerson = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var storeId, id, record, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        storeId = Number(request.params.id);
                        return [4, this.findParentClientIdFirst(request)];
                    case 1:
                        id = _a.sent();
                        return [4, this.repository.findInActiveSalePersonInStore(storeId, id)];
                    case 2:
                        record = _a.sent();
                        return [2, response.status(200).json(record)];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 4: return [2];
                }
            });
        }); };
        _this.update = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.save(request, response)];
            });
        }); };
        _this.save = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var author, salespersonId, storeId, i, salesPersonIdsToAdd, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.findUsernameInRequest(request)];
                    case 1:
                        author = _a.sent();
                        salespersonId = void 0, storeId = void 0;
                        for (i = 0; i < request.body.length; i++) {
                            if (request.body[i].salespersonIds) {
                                salespersonId = request.body[i].salespersonIds;
                            }
                            if (request.body[i].storeId) {
                                storeId = request.body[i].storeId;
                            }
                        }
                        salesPersonIdsToAdd = salespersonId;
                        return [4, this.repository.addSalePersonToStore(storeId, salesPersonIdsToAdd, author)];
                    case 2:
                        _a.sent();
                        return [2, response.status(200).json('ok')];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 4: return [2];
                }
            });
        }); };
        return _this;
    }
    StoreSalespersonsController.prototype.initRepository = function () {
        return new StoreSalesPerson_repository_1.StoreSalespersonsRepository();
    };
    StoreSalespersonsController.prototype.customRoutes = function () {
        var _this = this;
        this.router.get(this.path + '/:id/salesperson/active', function (req, res) { return _this.getActiveSalePerson(req, res); });
        this.router.get(this.path + '/:id/salesperson/inactive', function (req, res) { return _this.getInActiveSalePerson(req, res); });
    };
    StoreSalespersonsController.prototype.delete = function (request, response) {
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
    StoreSalespersonsController.prototype.findOne = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client, records, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findClientObject(request)];
                    case 1:
                        client = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        console.log('StoreSalespersonsController - findOne: ' + request);
                        return [4, this.repository.getDataByIdOfRowTable(Number(request.params.id))];
                    case 3:
                        records = _a.sent();
                        return [2, response.status(200).json(records)];
                    case 4:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 5: return [2];
                }
            });
        });
    };
    StoreSalespersonsController.prototype.create = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.save(request, response)];
            });
        });
    };
    return StoreSalespersonsController;
}(Base_controller_1.BaseController));
exports.default = StoreSalespersonsController;
//# sourceMappingURL=StoreSalesPerson.controller.js.map