"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TabletAccounts_1 = require("../models/entities/TabletAccounts");
var TabletAccounts_repository_1 = require("../repositories/TabletAccounts.repository");
var Base_controller_1 = require("./Base.controller");
var TabletAccountsController = (function (_super) {
    tslib_1.__extends(TabletAccountsController, _super);
    function TabletAccountsController() {
        var _this = _super.call(this, TabletAccounts_1.TabletAccounts, '/vs/tablet-accounts') || this;
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
    TabletAccountsController.prototype.initRepository = function () {
        return new TabletAccounts_repository_1.TabletAccountsRepository();
    };
    TabletAccountsController.prototype.customRoutes = function () {
        var _this = this;
        this.router.get(this.path + '/getUserInfoByJwt/routes', function (req, res) { return _this.getDataMethod(req, res); });
    };
    return TabletAccountsController;
}(Base_controller_1.BaseController));
exports.default = TabletAccountsController;
//# sourceMappingURL=TabletAccounts.controller.js.map