"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignProductsRepository = void 0;
var tslib_1 = require("tslib");
var CampaignProducts_1 = require("../models/entities/CampaignProducts");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var CampaignProductsRepository = (function (_super) {
    tslib_1.__extends(CampaignProductsRepository, _super);
    function CampaignProductsRepository() {
        return _super.call(this, CampaignProducts_1.CampaignProducts) || this;
    }
    return CampaignProductsRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.CampaignProductsRepository = CampaignProductsRepository;
//# sourceMappingURL=CampaignProducts.repository.js.map