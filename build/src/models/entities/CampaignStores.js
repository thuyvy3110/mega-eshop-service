"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignStores = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var Campaigns_1 = require("./Campaigns");
var Stores_1 = require("./Stores");
var VideoCalling_1 = require("./VideoCalling");
var CampaignStores = (function (_super) {
    tslib_1.__extends(CampaignStores, _super);
    function CampaignStores() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], CampaignStores.prototype, "campaignId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], CampaignStores.prototype, "storeId", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Campaigns_1.Campaigns; }, function (campaigns) { return campaigns.campaignStores; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'campaign_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Campaigns_1.Campaigns)
    ], CampaignStores.prototype, "campaign", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Stores_1.Stores; }, function (stores) { return stores.campaignStores; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Stores_1.Stores)
    ], CampaignStores.prototype, "store", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return VideoCalling_1.VideoCalling; }, function (videoCalling) { return videoCalling.campaignStore; }),
        tslib_1.__metadata("design:type", Array)
    ], CampaignStores.prototype, "videoCallings", void 0);
    CampaignStores = tslib_1.__decorate([
        typeorm_1.Index('campaign_stores_UNIQUE', ['campaignId', 'storeId'], { unique: true }),
        typeorm_1.Index('fk_campaign_stores_stores1_idx', ['storeId'], {}),
        typeorm_1.Entity('campaign_stores')
    ], CampaignStores);
    return CampaignStores;
}(Base_models_1.BaseModel));
exports.CampaignStores = CampaignStores;
//# sourceMappingURL=CampaignStores.js.map