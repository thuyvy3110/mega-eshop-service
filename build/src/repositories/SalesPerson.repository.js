"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalespersonRepository = void 0;
var tslib_1 = require("tslib");
var Salespersons_1 = require("../models/entities/Salespersons");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var jwt_decode_1 = tslib_1.__importDefault(require("jwt-decode"));
var typeorm_1 = require("typeorm");
var SalespersonRepository = (function (_super) {
    tslib_1.__extends(SalespersonRepository, _super);
    function SalespersonRepository() {
        return _super.call(this, Salespersons_1.SalePerson) || this;
    }
    SalespersonRepository.prototype.getUserInfoByJwt = function (token) {
        var _a, _b, _c, _d;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var execData, cognitoName, arrStore, data;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        execData = jwt_decode_1.default(token);
                        cognitoName = execData['username'];
                        arrStore = [];
                        return [4, typeorm_1.getRepository(Salespersons_1.SalePerson)
                                .createQueryBuilder('sp')
                                .leftJoinAndSelect('store_salespersons', 'ss', 'ss.salespersonId = sp.id')
                                .leftJoinAndSelect('ss.store', 'stores')
                                .leftJoinAndSelect('stores.client', 'clients')
                                .leftJoinAndSelect('clients.languageType2', 'languages')
                                .where('account = :name', { name: cognitoName })
                                .getRawMany()];
                    case 1:
                        data = _e.sent();
                        if (data.length > 0)
                            data.forEach(function (item) { return arrStore.push(item.stores_id); });
                        return [2, {
                                store: {
                                    storeId: arrStore
                                },
                                client: {
                                    clientId: (_a = data[0]) === null || _a === void 0 ? void 0 : _a['clients_id'],
                                    clientName: (_b = data[0]) === null || _b === void 0 ? void 0 : _b['clients_name']
                                },
                                salePerson: {
                                    id: (_c = data[0]) === null || _c === void 0 ? void 0 : _c['sp_id']
                                },
                                language: (_d = data[0]) === null || _d === void 0 ? void 0 : _d['languages_language']
                            }];
                }
            });
        });
    };
    SalespersonRepository.prototype.findByAccount = function (account) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.repository.findOne({ account: account })];
            });
        });
    };
    SalespersonRepository.prototype.getSalespersonByClientId = function (clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.repository
                        .createQueryBuilder('salespersons')
                        .where('salespersons.client_id = :client_id ')
                        .setParameter('client_id', clientId)
                        .getMany()];
            });
        });
    };
    return SalespersonRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.SalespersonRepository = SalespersonRepository;
//# sourceMappingURL=SalesPerson.repository.js.map