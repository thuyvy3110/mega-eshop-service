"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var SaleAreas_1 = require("../models/entities/SaleAreas");
var SaleAreas_repository_1 = require("../repositories/SaleAreas.repository");
var Base_controller_1 = require("./Base.controller");
var SaleAreaController = (function (_super) {
    tslib_1.__extends(SaleAreaController, _super);
    function SaleAreaController() {
        return _super.call(this, SaleAreas_1.SaleAreas, '/vs/sale-area') || this;
    }
    SaleAreaController.prototype.initRepository = function () {
        return new SaleAreas_repository_1.SaleAreaRepository();
    };
    SaleAreaController.prototype.customRoutes = function () {
        return;
    };
    SaleAreaController.prototype.find = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var clientId, parentClientId, entities, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findClientId(request)];
                    case 1:
                        clientId = _a.sent();
                        return [4, this.findParentClientIdFirst(request)];
                    case 2:
                        parentClientId = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4, typeorm_1.getRepository(this.entity).createQueryBuilder()
                                .where('client_id in (:clientId, :parentClientId)', { clientId: clientId, parentClientId: parentClientId })
                                .orderBy('updated_at', 'DESC')
                                .getMany()];
                    case 4:
                        entities = _a.sent();
                        return [2, response.status(200).json(entities)];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 6: return [2];
                }
            });
        });
    };
    return SaleAreaController;
}(Base_controller_1.BaseController));
exports.default = SaleAreaController;
//# sourceMappingURL=SaleArea.controller.js.map