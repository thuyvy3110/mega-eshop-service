"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var CampaignStores_1 = require("../models/entities/CampaignStores");
var CampaignStores_repository_1 = require("../repositories/CampaignStores.repository");
var Base_controller_1 = require("./Base.controller");
var StoreController = (function (_super) {
    tslib_1.__extends(StoreController, _super);
    function StoreController() {
        return _super.call(this, CampaignStores_1.CampaignStores, '/vs/campaign-stores') || this;
    }
    StoreController.prototype.initRepository = function () {
        return new CampaignStores_repository_1.CampaignStoresRepository();
    };
    StoreController.prototype.customRoutes = function () {
        return;
    };
    return StoreController;
}(Base_controller_1.BaseController));
exports.default = StoreController;
//# sourceMappingURL=CampaignStores.controller.js.map