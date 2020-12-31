"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabletAccounts = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var Stores_1 = require("./Stores");
var VideoCalling_1 = require("./VideoCalling");
var TabletAccounts = (function (_super) {
    tslib_1.__extends(TabletAccounts, _super);
    function TabletAccounts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], TabletAccounts.prototype, "account", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], TabletAccounts.prototype, "storeId", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Stores_1.Stores; }, function (stores) { return stores.tabletAccounts; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION'
        }),
        typeorm_1.JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Stores_1.Stores)
    ], TabletAccounts.prototype, "store", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return VideoCalling_1.VideoCalling; }, function (videoCalling) { return videoCalling.account; }),
        tslib_1.__metadata("design:type", Array)
    ], TabletAccounts.prototype, "videoCallings", void 0);
    TabletAccounts = tslib_1.__decorate([
        typeorm_1.Index('tablet_accounts_UNIQUE', ['account', 'storeId'], { unique: true }),
        typeorm_1.Index('fk_tablet_accounts_stores1_idx', ['storeId'], {}),
        typeorm_1.Entity('tablet_accounts')
    ], TabletAccounts);
    return TabletAccounts;
}(Base_models_1.BaseModel));
exports.TabletAccounts = TabletAccounts;
//# sourceMappingURL=TabletAccounts.js.map