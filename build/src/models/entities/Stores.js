"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stores = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var CampaignStores_1 = require("./CampaignStores");
var Clients_1 = require("./Clients");
var DisplayAccounts_1 = require("./DisplayAccounts");
var StoreSalespersons_1 = require("./StoreSalespersons");
var TabletAccounts_1 = require("./TabletAccounts");
var Stores = (function (_super) {
    tslib_1.__extends(Stores, _super);
    function Stores() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column({ length: 200 }),
        tslib_1.__metadata("design:type", String)
    ], Stores.prototype, "storeName", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Stores.prototype, "clientId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 200 }),
        tslib_1.__metadata("design:type", String)
    ], Stores.prototype, "address", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], Stores.prototype, "officer", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], Stores.prototype, "contactInformation", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Stores.prototype, "memo", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return CampaignStores_1.CampaignStores; }, function (campaignStores) { return campaignStores.store; }),
        tslib_1.__metadata("design:type", Array)
    ], Stores.prototype, "campaignStores", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return DisplayAccounts_1.DisplayAccounts; }, function (displayAccounts) { return displayAccounts.store; }),
        tslib_1.__metadata("design:type", Array)
    ], Stores.prototype, "displayAccounts", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return StoreSalespersons_1.StoreSalespersons; }, function (storeSalespersons) { return storeSalespersons.store; }),
        tslib_1.__metadata("design:type", Array)
    ], Stores.prototype, "storeSalespersons", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Clients_1.Clients; }, function (clients) { return clients.stores; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Clients_1.Clients)
    ], Stores.prototype, "client", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return TabletAccounts_1.TabletAccounts; }, function (tabletAccounts) { return tabletAccounts.store; }),
        tslib_1.__metadata("design:type", Array)
    ], Stores.prototype, "tabletAccounts", void 0);
    Stores = tslib_1.__decorate([
        typeorm_1.Index('stores_UNIQUE', ['storeName', 'clientId'], { unique: true }),
        typeorm_1.Index('fk_stores_clients1_idx', ['clientId'], {}),
        typeorm_1.Entity('stores')
    ], Stores);
    return Stores;
}(Base_models_1.BaseModel));
exports.Stores = Stores;
//# sourceMappingURL=Stores.js.map