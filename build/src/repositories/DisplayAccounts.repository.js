"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayAccountsRepository = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var DisplayAccounts_1 = require("../models/entities/DisplayAccounts");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var jwt_decode_1 = tslib_1.__importDefault(require("jwt-decode"));
var DisplayAccountsRepository = (function (_super) {
    tslib_1.__extends(DisplayAccountsRepository, _super);
    function DisplayAccountsRepository() {
        return _super.call(this, DisplayAccounts_1.DisplayAccounts) || this;
    }
    DisplayAccountsRepository.prototype.getUserInfoByJwt = function (token) {
        var _a, _b, _c, _d;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var execData, cognitoName, data;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        execData = jwt_decode_1.default(token);
                        cognitoName = execData["username"];
                        return [4, typeorm_1.getRepository(DisplayAccounts_1.DisplayAccounts)
                                .createQueryBuilder("display_accounts")
                                .leftJoinAndSelect("display_accounts.store", "stores")
                                .leftJoinAndSelect("stores.client", "clients")
                                .leftJoinAndSelect("clients.languageType2", "languages")
                                .where('account = :name', { name: cognitoName })
                                .getOne()];
                    case 1:
                        data = _e.sent();
                        return [2, {
                                id: data === null || data === void 0 ? void 0 : data.id,
                                account: data === null || data === void 0 ? void 0 : data.account,
                                store: {
                                    storeId: data === null || data === void 0 ? void 0 : data.storeId,
                                    storeName: (_a = data === null || data === void 0 ? void 0 : data.store) === null || _a === void 0 ? void 0 : _a.storeName
                                },
                                language: (_d = (_c = (_b = data === null || data === void 0 ? void 0 : data.store) === null || _b === void 0 ? void 0 : _b.client) === null || _c === void 0 ? void 0 : _c.languageType2) === null || _d === void 0 ? void 0 : _d.language
                            }];
                }
            });
        });
    };
    DisplayAccountsRepository.prototype.findByAccount = function (account) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.repository.findOne({ account: account })];
            });
        });
    };
    return DisplayAccountsRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.DisplayAccountsRepository = DisplayAccountsRepository;
//# sourceMappingURL=DisplayAccounts.repository.js.map