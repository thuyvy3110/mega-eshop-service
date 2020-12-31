"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUsersRepository = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var AdminUsers_1 = require("../models/entities/AdminUsers");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var jwt_decode_1 = tslib_1.__importDefault(require("jwt-decode"));
var AdminUsersRepository = (function (_super) {
    tslib_1.__extends(AdminUsersRepository, _super);
    function AdminUsersRepository() {
        return _super.call(this, AdminUsers_1.AdminUsers) || this;
    }
    AdminUsersRepository.prototype.getUserInfoByJwt = function (token) {
        var _a, _b, _c, _d;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var execData, cognitoName, data;
            return tslib_1.__generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        console.log("Get Admin Users Information : ...");
                        execData = jwt_decode_1.default(token);
                        cognitoName = execData["username"];
                        return [4, typeorm_1.getRepository(AdminUsers_1.AdminUsers)
                                .createQueryBuilder("admin_users")
                                .leftJoinAndSelect("admin_users.client", "clients")
                                .leftJoinAndSelect("clients.languageType2", "languages")
                                .where('account = :name', { name: cognitoName })
                                .getOne()];
                    case 1:
                        data = _e.sent();
                        return [2, {
                                client: {
                                    clientId: (_a = data === null || data === void 0 ? void 0 : data.client) === null || _a === void 0 ? void 0 : _a.id,
                                    clientName: (_b = data === null || data === void 0 ? void 0 : data.client) === null || _b === void 0 ? void 0 : _b.name
                                },
                                language: (_d = (_c = data === null || data === void 0 ? void 0 : data.client) === null || _c === void 0 ? void 0 : _c.languageType2) === null || _d === void 0 ? void 0 : _d.language
                            }];
                }
            });
        });
    };
    AdminUsersRepository.prototype.findByAccount = function (account) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.repository.findOne({ account: account })];
            });
        });
    };
    return AdminUsersRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.AdminUsersRepository = AdminUsersRepository;
//# sourceMappingURL=AdminUsers.repository.js.map