"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var AdminUsers_1 = require("../models/entities/AdminUsers");
var AdminUsers_repository_1 = require("../repositories/AdminUsers.repository");
var Base_controller_1 = require("./Base.controller");
var AdminUsersController = (function (_super) {
    tslib_1.__extends(AdminUsersController, _super);
    function AdminUsersController() {
        var _this = _super.call(this, AdminUsers_1.AdminUsers, '/vs/admin-users') || this;
        _this.getDataMethod = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var token, data, error_1;
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        token = (_a = request.get('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
                        return [4, this.repository.getUserInfoByJwt(token)];
                    case 1:
                        data = _b.sent();
                        return [2, response.status(200).json(data)];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 3: return [2];
                }
            });
        }); };
        return _this;
    }
    AdminUsersController.prototype.initRepository = function () {
        return new AdminUsers_repository_1.AdminUsersRepository();
    };
    AdminUsersController.prototype.customRoutes = function () {
        var _this = this;
        this.router.get(this.path + '/getUserInfoByJwt/routes', function (req, res) { return _this.getDataMethod(req, res); });
    };
    return AdminUsersController;
}(Base_controller_1.BaseController));
exports.default = AdminUsersController;
//# sourceMappingURL=AdminUsers.controller.js.map