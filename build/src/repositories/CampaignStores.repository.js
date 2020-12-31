"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignStoresRepository = void 0;
var tslib_1 = require("tslib");
var CampaignStores_1 = require("../models/entities/CampaignStores");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var CampaignStoresRepository = (function (_super) {
    tslib_1.__extends(CampaignStoresRepository, _super);
    function CampaignStoresRepository() {
        return _super.call(this, CampaignStores_1.CampaignStores) || this;
    }
    return CampaignStoresRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.CampaignStoresRepository = CampaignStoresRepository;
//# sourceMappingURL=CampaignStores.repository.js.map