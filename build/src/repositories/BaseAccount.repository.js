"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAccountRepository = void 0;
var tslib_1 = require("tslib");
var AdminUsers_repository_1 = require("./AdminUsers.repository");
var SalesPerson_repository_1 = require("./SalesPerson.repository");
var DisplayAccounts_repository_1 = require("./DisplayAccounts.repository");
var TabletAccounts_repository_1 = require("./TabletAccounts.repository");
var Client_repository_1 = require("./Client.repository");
var BaseAccountRepository = (function () {
    function BaseAccountRepository() {
        this.adminRepository = new AdminUsers_repository_1.AdminUsersRepository();
        this.salesPersonRepository = new SalesPerson_repository_1.SalespersonRepository();
        this.displayRepository = new DisplayAccounts_repository_1.DisplayAccountsRepository();
        this.tabletRepository = new TabletAccounts_repository_1.TabletAccountsRepository();
        this.clientRepository = new Client_repository_1.ClientRepository();
    }
    BaseAccountRepository.prototype.getClientId = function (account, poolname) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var clientId, user, user, user, user;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        clientId = 0;
                        if (!(poolname == 'admin')) return [3, 2];
                        return [4, this.getAccountAdmin(account)];
                    case 1:
                        user = _a.sent();
                        clientId = (user === null || user === void 0 ? void 0 : user.clientId) || 0;
                        return [3, 8];
                    case 2:
                        if (!(poolname == 'display')) return [3, 4];
                        return [4, this.getAccountDisplay(account)];
                    case 3:
                        user = _a.sent();
                        clientId = 0;
                        return [3, 8];
                    case 4:
                        if (!(poolname == 'sales_person')) return [3, 6];
                        return [4, this.getAccountSalesPerson(account)];
                    case 5:
                        user = _a.sent();
                        clientId = (user === null || user === void 0 ? void 0 : user.clientId) || 0;
                        return [3, 8];
                    case 6:
                        if (!(poolname == 'tablet')) return [3, 8];
                        return [4, this.getAccountTablet(account)];
                    case 7:
                        user = _a.sent();
                        clientId = 0;
                        _a.label = 8;
                    case 8: return [2, clientId];
                }
            });
        });
    };
    BaseAccountRepository.prototype.getClientObject = function (account, poolname) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var clientId;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getClientId(account, poolname)];
                    case 1:
                        clientId = _a.sent();
                        return [2, this.clientRepository.findOneById(clientId)];
                }
            });
        });
    };
    BaseAccountRepository.prototype.getAccountAdmin = function (account) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.adminRepository.findByAccount(account)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    BaseAccountRepository.prototype.getAccountDisplay = function (account) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.displayRepository.findByAccount(account)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    BaseAccountRepository.prototype.getAccountTablet = function (account) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.tabletRepository.findByAccount(account)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    BaseAccountRepository.prototype.getAccountSalesPerson = function (account) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.salesPersonRepository.findByAccount(account)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return BaseAccountRepository;
}());
exports.BaseAccountRepository = BaseAccountRepository;
//# sourceMappingURL=BaseAccount.repository.js.map