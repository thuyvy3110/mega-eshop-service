"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreSalespersons = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var Salespersons_1 = require("./Salespersons");
var Stores_1 = require("./Stores");
var StoreSalespersons = (function (_super) {
    tslib_1.__extends(StoreSalespersons, _super);
    function StoreSalespersons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], StoreSalespersons.prototype, "storeId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], StoreSalespersons.prototype, "salespersonId", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return Salespersons_1.SalePerson; }, function (salespersons) { return salespersons.storeSalespersons; }),
        typeorm_1.JoinColumn([{ name: 'salesperson_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Object)
    ], StoreSalespersons.prototype, "salesperson", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Stores_1.Stores; }, function (stores) { return stores.storeSalespersons; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Stores_1.Stores)
    ], StoreSalespersons.prototype, "store", void 0);
    StoreSalespersons = tslib_1.__decorate([
        typeorm_1.Index('store_salespersons_UNIQUE', ['storeId', 'salespersonId'], {
            unique: true,
        }),
        typeorm_1.Index('fk_store_salespersons_salespersons1_idx', ['salespersonId'], {}),
        typeorm_1.Entity('store_salespersons')
    ], StoreSalespersons);
    return StoreSalespersons;
}(Base_models_1.BaseModel));
exports.StoreSalespersons = StoreSalespersons;
//# sourceMappingURL=StoreSalespersons.js.map