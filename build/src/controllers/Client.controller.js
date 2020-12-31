"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Clients_1 = require("../models/entities/Clients");
var Client_repository_1 = require("../repositories/Client.repository");
var Base_controller_1 = require("./Base.controller");
var ClientController = (function (_super) {
    tslib_1.__extends(ClientController, _super);
    function ClientController() {
        var _this = _super.call(this, Clients_1.Clients, '/vs/client') || this;
        _this.getClientByType = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var data, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.repository.getClientByType(request.params.clientType)];
                    case 1:
                        data = _a.sent();
                        return [2, response.status(200).json(data)];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 3: return [2];
                }
            });
        }); };
        return _this;
    }
    ClientController.prototype.initRepository = function () {
        return new Client_repository_1.ClientRepository();
    };
    ClientController.prototype.customRoutes = function () {
        var _this = this;
        this.router.get(this.path + '/getClientByType/routes/:clientType', function (req, res) { return _this.getClientByType(req, res); });
    };
    return ClientController;
}(Base_controller_1.BaseController));
exports.default = ClientController;
//# sourceMappingURL=Client.controller.js.map