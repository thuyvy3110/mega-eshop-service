"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSalespersonsRepository = void 0;
var tslib_1 = require("tslib");
var StoreSalespersons_1 = require("../models/entities/StoreSalespersons");
var Salespersons_1 = require("../models/entities/Salespersons");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var typeorm_1 = require("typeorm");
var Stores_1 = require("../models/entities/Stores");
var typeorm_2 = require("typeorm");
var Store_repository_1 = require("./Store.repository");
var SalesPerson_repository_1 = require("./SalesPerson.repository");
var StoreSalespersonsRepository = (function (_super) {
    tslib_1.__extends(StoreSalespersonsRepository, _super);
    function StoreSalespersonsRepository() {
        var _this = _super.call(this, StoreSalespersons_1.StoreSalespersons) || this;
        _this.storeRepository = new Store_repository_1.StoreRepository();
        _this.salesPersonRepository = new SalesPerson_repository_1.SalespersonRepository();
        return _this;
    }
    StoreSalespersonsRepository.prototype.findByClientId = function (clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, mapResult;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = [];
                        return [4, this.repository.createQueryBuilder('ssp')
                                .innerJoinAndSelect('salespersons', 'sp', 'sp.id = ssp.salespersonId')
                                .innerJoinAndSelect('stores', 's', 's.id = ssp.storeId')
                                .where("s.client_id = :client_id")
                                .setParameter('client_id', clientId)
                                .orderBy('ssp.updatedAt', 'DESC')
                                .getRawMany()
                                .then(function (items) {
                                items.forEach(function (item) {
                                    var ssp = new StoreSalespersons_1.StoreSalespersons();
                                    ssp.createdAt = item.ssp_created_at;
                                    ssp.updatedAt = item.ssp_updated_at;
                                    ssp.createdBy = item.ssp_created_by;
                                    ssp.updatedBy = item.ssp_updated_by;
                                    ssp.id = item.ssp_id;
                                    ssp.storeId = item.ssp_store_id;
                                    ssp.salespersonId = item.ssp_salesperson_id;
                                    ssp.store = new Stores_1.Stores();
                                    ssp.store.id = item.s_id;
                                    ssp.store.storeName = item.s_store_name;
                                    ssp.store.officer = item.s_officer;
                                    var ssp1 = new Salespersons_1.SalePerson();
                                    ssp1.id = item.sp_id;
                                    ssp1.name = item.sp_name;
                                    ssp.salesperson = ssp1;
                                    result.push(ssp);
                                });
                            })];
                    case 1:
                        _a.sent();
                        mapResult = new Map();
                        result.forEach(function (r) {
                            if (!mapResult.get(r.storeId)) {
                                r['salespersons'] = [];
                                mapResult.set(r.storeId, r);
                            }
                            var d = mapResult.get(r.storeId);
                            d['salespersons'].push(r.salesperson);
                        });
                        return [2, Array.from(mapResult.values())];
                }
            });
        });
    };
    StoreSalespersonsRepository.prototype.getSalespersonIdByStoreSalesperson = function (storeId, clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var salespersonId;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        salespersonId = [];
                        return [4, this.repository.createQueryBuilder('ssp')
                                .innerJoinAndSelect(StoreSalespersons_1.StoreSalespersons, 'sp', 'sp.store_id = ssp.store_id')
                                .innerJoinAndSelect(Stores_1.Stores, 's', 's.id = ssp.storeId')
                                .where("s.client_id = :client_id AND sp.store_id = " + storeId)
                                .setParameter('client_id', clientId)
                                .orderBy('ssp.updatedAt', 'DESC')
                                .select('ssp.salespersonId')
                                .getMany().then(function (data) {
                                data.forEach(function (element) { return salespersonId.push(element.salespersonId); });
                            })];
                    case 1:
                        _a.sent();
                        if (salespersonId.length < 0)
                            return [2, []];
                        return [2, salespersonId];
                }
            });
        });
    };
    StoreSalespersonsRepository.prototype.getSalespersonId = function (clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var salesperson;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        salesperson = [];
                        return [4, typeorm_2.getRepository(Salespersons_1.SalePerson)
                                .createQueryBuilder("salespersons")
                                .where("client_id = " + clientId)
                                .getMany().then(function (data) {
                                data.forEach(function (element) { return salesperson.push(element); });
                            })];
                    case 1:
                        _a.sent();
                        if (salesperson.length < 0)
                            return [2, []];
                        return [2, salesperson];
                }
            });
        });
    };
    StoreSalespersonsRepository.prototype.findActiveSalePersonInStore = function (storeId, clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var salespersonIdInStoreSalesperson, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getSalespersonIdByStoreSalesperson(storeId, clientId)];
                    case 1:
                        salespersonIdInStoreSalesperson = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 6, , 7]);
                        if (!(salespersonIdInStoreSalesperson.length > 0)) return [3, 4];
                        return [4, typeorm_2.getRepository(Salespersons_1.SalePerson)
                                .createQueryBuilder("salespersons")
                                .where("salespersons.id IN (" + salespersonIdInStoreSalesperson + ")")
                                .getMany()];
                    case 3: return [2, _a.sent()];
                    case 4: return [2, []];
                    case 5: return [3, 7];
                    case 6:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3, 7];
                    case 7: return [2];
                }
            });
        });
    };
    StoreSalespersonsRepository.prototype.findInActiveSalePersonInStore = function (storeId, clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var inActiveSalespersonId, salesperson, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getSalespersonIdByStoreSalesperson(storeId, clientId)];
                    case 1:
                        inActiveSalespersonId = _a.sent();
                        return [4, this.getSalespersonId(clientId)];
                    case 2:
                        salesperson = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, , 8]);
                        if (!(inActiveSalespersonId.length > 0)) return [3, 5];
                        return [4, typeorm_2.getRepository(Salespersons_1.SalePerson)
                                .createQueryBuilder("salespersons")
                                .where("salespersons.id NOT IN (" + inActiveSalespersonId + ") AND salespersons.clientId == " + clientId)
                                .getMany()];
                    case 4: return [2, _a.sent()];
                    case 5:
                        if (salesperson.length > 0 && salesperson[0] !== undefined)
                            return [2, salesperson];
                        else
                            return [2, []];
                        _a.label = 6;
                    case 6: return [3, 8];
                    case 7:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3, 8];
                    case 8: return [2];
                }
            });
        });
    };
    StoreSalespersonsRepository.prototype.addSalePersonToStore = function (storeId, salesPersonId, author) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var rows;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, typeorm_1.createQueryBuilder()
                            .delete()
                            .from(StoreSalespersons_1.StoreSalespersons)
                            .where("store_id = :storeId", { storeId: storeId })
                            .execute()];
                    case 1:
                        _a.sent();
                        rows = salesPersonId.map(function (sp) {
                            var r = new StoreSalespersons_1.StoreSalespersons();
                            r.storeId = storeId;
                            r.salespersonId = sp;
                            r.updatedBy = author;
                            r.createdBy = author;
                            return r;
                        });
                        return [4, this.repository.save(rows)];
                    case 2: return [2, _a.sent()];
                }
            });
        });
    };
    StoreSalespersonsRepository.prototype.getDataByIdOfRowTable = function (rowId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, store, storeSalespersons, salesPersonIds, salesPersons;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.findOne(rowId)];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            return [2, {}];
                        }
                        return [4, this.storeRepository.findOneById(data.storeId)];
                    case 2:
                        store = _a.sent();
                        if (!store) {
                            return [2, {}];
                        }
                        data.store = store !== null && store !== void 0 ? store : null;
                        return [4, this.repository.find({
                                where: {
                                    storeId: data.storeId
                                }
                            })];
                    case 3:
                        storeSalespersons = _a.sent();
                        salesPersonIds = storeSalespersons.map(function (item) { return item.salespersonId; });
                        return [4, this.salesPersonRepository.findByIds(salesPersonIds)];
                    case 4:
                        salesPersons = _a.sent();
                        data.salesperson = salesPersons;
                        return [2, data];
                }
            });
        });
    };
    StoreSalespersonsRepository.prototype.findBySalePersonId = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.find({
                            where: {
                                salespersonId: id
                            }
                        })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    StoreSalespersonsRepository.prototype.deleteByStoreId = function (storeId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, typeorm_1.createQueryBuilder()
                            .delete()
                            .from(StoreSalespersons_1.StoreSalespersons)
                            .where("store_id IN (" + storeId + ")")
                            .execute()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return StoreSalespersonsRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.StoreSalespersonsRepository = StoreSalespersonsRepository;
//# sourceMappingURL=StoreSalesPerson.repository.js.map