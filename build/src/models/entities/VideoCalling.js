"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoCalling = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var TabletAccounts_1 = require("./TabletAccounts");
var CampaignStores_1 = require("./CampaignStores");
var Salespersons_1 = require("./Salespersons");
var Base_models_1 = require("../Base.models");
var VideoCalling = (function (_super) {
    tslib_1.__extends(VideoCalling, _super);
    function VideoCalling() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], VideoCalling.prototype, "accountId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], VideoCalling.prototype, "campaignStoreId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], VideoCalling.prototype, "salespersonId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Date)
    ], VideoCalling.prototype, "startedAt", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Date)
    ], VideoCalling.prototype, "stoppedAt", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return TabletAccounts_1.TabletAccounts; }, function (tabletAccounts) { return tabletAccounts.videoCallings; }, { onDelete: "NO ACTION", onUpdate: "NO ACTION" }),
        typeorm_1.JoinColumn([{ name: "account_id", referencedColumnName: "id" }]),
        tslib_1.__metadata("design:type", TabletAccounts_1.TabletAccounts)
    ], VideoCalling.prototype, "account", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return CampaignStores_1.CampaignStores; }, function (campaignStores) { return campaignStores.videoCallings; }, { onDelete: "NO ACTION", onUpdate: "NO ACTION" }),
        typeorm_1.JoinColumn([{ name: "campaign_store_id", referencedColumnName: "id" }]),
        tslib_1.__metadata("design:type", CampaignStores_1.CampaignStores)
    ], VideoCalling.prototype, "campaignStore", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Salespersons_1.SalePerson; }, function (salespersons) { return salespersons.videoCallings; }, {
            onDelete: "NO ACTION",
            onUpdate: "NO ACTION",
        }),
        typeorm_1.JoinColumn([{ name: "salesperson_id", referencedColumnName: "id" }]),
        tslib_1.__metadata("design:type", Salespersons_1.SalePerson)
    ], VideoCalling.prototype, "salesperson", void 0);
    VideoCalling = tslib_1.__decorate([
        typeorm_1.Index("index2", ["accountId", "campaignStoreId", "salespersonId"], {}),
        typeorm_1.Index("fk_video_calling_campaign_store_idx", ["campaignStoreId"], {}),
        typeorm_1.Index("fk_video_calling_salesperson_idx", ["salespersonId"], {}),
        typeorm_1.Entity("video_calling")
    ], VideoCalling);
    return VideoCalling;
}(Base_models_1.BaseModel));
exports.VideoCalling = VideoCalling;
//# sourceMappingURL=VideoCalling.js.map