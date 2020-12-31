"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabletAccountsRepository = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var TabletAccounts_1 = require("../models/entities/TabletAccounts");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var jwt_decode_1 = tslib_1.__importDefault(require("jwt-decode"));
var TabletAccountsRepository = (function (_super) {
    tslib_1.__extends(TabletAccountsRepository, _super);
    function TabletAccountsRepository() {
        return _super.call(this, TabletAccounts_1.TabletAccounts) || this;
    }
    TabletAccountsRepository.prototype.getUserInfoByJwt = function (token) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var execData, cognitoName, data;
            return tslib_1.__generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        execData = jwt_decode_1.default(token);
                        cognitoName = execData["username"];
                        return [4, typeorm_1.getRepository(TabletAccounts_1.TabletAccounts)
                                .createQueryBuilder("tablet_accounts")
                                .leftJoinAndSelect("tablet_accounts.store", "stores")
                                .leftJoinAndSelect("stores.client", "clients")
                                .leftJoinAndSelect("clients.languageType2", "languages")
                                .where('account = :name', { name: cognitoName })
                                .getOne()];
                    case 1:
                        data = _j.sent();
                        return [2, {
                                id: data === null || data === void 0 ? void 0 : data.id,
                                account: data === null || data === void 0 ? void 0 : data.account,
                                store: {
                                    storeId: data === null || data === void 0 ? void 0 : data.storeId,
                                    storeName: (_a = data === null || data === void 0 ? void 0 : data.store) === null || _a === void 0 ? void 0 : _a.storeName
                                },
                                client: {
                                    clientId: (_c = (_b = data === null || data === void 0 ? void 0 : data.store) === null || _b === void 0 ? void 0 : _b.client) === null || _c === void 0 ? void 0 : _c.type,
                                    clientName: (_e = (_d = data === null || data === void 0 ? void 0 : data.store) === null || _d === void 0 ? void 0 : _d.client) === null || _e === void 0 ? void 0 : _e.name,
                                },
                                language: (_h = (_g = (_f = data === null || data === void 0 ? void 0 : data.store) === null || _f === void 0 ? void 0 : _f.client) === null || _g === void 0 ? void 0 : _g.languageType2) === null || _h === void 0 ? void 0 : _h.language
                            }];
                }
            });
        });
    };
    TabletAccountsRepository.prototype.findByAccount = function (account) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.repository.findOne({ account: account })];
            });
        });
    };
    return TabletAccountsRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.TabletAccountsRepository = TabletAccountsRepository;
//# sourceMappingURL=TabletAccounts.repository.js.map