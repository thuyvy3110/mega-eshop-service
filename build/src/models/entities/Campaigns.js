"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Campaigns = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var CampaignProducts_1 = require("./CampaignProducts");
var CampaignStores_1 = require("./CampaignStores");
var Categories_1 = require("./Categories");
var Clients_1 = require("./Clients");
var Scenarios_1 = require("./Scenarios");
var Campaigns = (function (_super) {
    tslib_1.__extends(Campaigns, _super);
    function Campaigns() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Campaigns.prototype, "campaignName", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Campaigns.prototype, "clientId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Campaigns.prototype, "categoryId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('datetime', { name: 'start_date', comment: 'é–‹å§‹æ—¥' }),
        tslib_1.__metadata("design:type", Date)
    ], Campaigns.prototype, "startDate", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('datetime', { name: 'end_date', comment: 'çµ‚äº†æ—¥' }),
        tslib_1.__metadata("design:type", Date)
    ], Campaigns.prototype, "endDate", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('text', { name: 'content', nullable: true, comment: 'å†…å®¹' }),
        tslib_1.__metadata("design:type", String)
    ], Campaigns.prototype, "content", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 50, }),
        tslib_1.__metadata("design:type", String)
    ], Campaigns.prototype, "status", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Campaigns.prototype, "periods", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Campaigns.prototype, "goods", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Campaigns.prototype, "dueDate", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], Campaigns.prototype, "image1", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], Campaigns.prototype, "image2", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], Campaigns.prototype, "image3", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], Campaigns.prototype, "image4", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], Campaigns.prototype, "image5", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return CampaignProducts_1.CampaignProducts; }, function (campaignProducts) { return campaignProducts.campaign; }),
        tslib_1.__metadata("design:type", Array)
    ], Campaigns.prototype, "campaignProducts", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return CampaignStores_1.CampaignStores; }, function (campaignStores) { return campaignStores.campaign; }),
        tslib_1.__metadata("design:type", CampaignStores_1.CampaignStores)
    ], Campaigns.prototype, "campaignStores", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Categories_1.Categories; }, function (categories) { return categories.campaigns; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Categories_1.Categories)
    ], Campaigns.prototype, "category", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Clients_1.Clients; }, function (clients) { return clients.campaigns; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Clients_1.Clients)
    ], Campaigns.prototype, "client", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Scenarios_1.Scenarios; }, function (scenarios) { return scenarios.campaignId; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'scenario', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Scenarios_1.Scenarios)
    ], Campaigns.prototype, "scenario", void 0);
    Campaigns = tslib_1.__decorate([
        typeorm_1.Index('campaigns_UNIQUE', ['campaignName', 'clientId'], { unique: true }),
        typeorm_1.Index('fk_campaigns_scenarios1_idx', ['scenario'], {}),
        typeorm_1.Index('fk_campaigns_clients1_idx', ['clientId'], {}),
        typeorm_1.Index('fk_campaigns_categories1_idx', ['categoryId'], {}),
        typeorm_1.Entity('campaigns')
    ], Campaigns);
    return Campaigns;
}(Base_models_1.BaseModel));
exports.Campaigns = Campaigns;
//# sourceMappingURL=Campaigns.js.map