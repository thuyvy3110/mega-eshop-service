"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayAccounts = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var Stores_1 = require("./Stores");
var DisplayAccounts = (function (_super) {
    tslib_1.__extends(DisplayAccounts, _super);
    function DisplayAccounts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], DisplayAccounts.prototype, "account", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], DisplayAccounts.prototype, "storeId", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Stores_1.Stores; }, function (stores) { return stores.displayAccounts; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Stores_1.Stores)
    ], DisplayAccounts.prototype, "store", void 0);
    DisplayAccounts = tslib_1.__decorate([
        typeorm_1.Index('display_accounts_UNIQUE', ['account', 'storeId'], { unique: true }),
        typeorm_1.Index('fk_display_accounts_stores1_idx', ['storeId'], {}),
        typeorm_1.Entity('display_accounts')
    ], DisplayAccounts);
    return DisplayAccounts;
}(Base_models_1.BaseModel));
exports.DisplayAccounts = DisplayAccounts;
//# sourceMappingURL=DisplayAccounts.js.map