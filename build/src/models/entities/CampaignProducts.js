"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignProducts = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var Campaigns_1 = require("./Campaigns");
var Products_1 = require("./Products");
var CampaignProducts = (function (_super) {
    tslib_1.__extends(CampaignProducts, _super);
    function CampaignProducts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], CampaignProducts.prototype, "campaignId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], CampaignProducts.prototype, "productId", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Campaigns_1.Campaigns; }, function (campaigns) { return campaigns.campaignProducts; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'campaign_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Campaigns_1.Campaigns)
    ], CampaignProducts.prototype, "campaign", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Products_1.Products; }, function (products) { return products.campaignProducts; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Products_1.Products)
    ], CampaignProducts.prototype, "product", void 0);
    CampaignProducts = tslib_1.__decorate([
        typeorm_1.Index('campaign_products_UNIQUE', ['campaignId', 'productId'], {
            unique: true,
        }),
        typeorm_1.Index('fk_campaign_products_products1_idx', ['productId'], {}),
        typeorm_1.Entity('campaign_products')
    ], CampaignProducts);
    return CampaignProducts;
}(Base_models_1.BaseModel));
exports.CampaignProducts = CampaignProducts;
//# sourceMappingURL=CampaignProducts.js.map