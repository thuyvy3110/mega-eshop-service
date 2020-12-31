"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalespersonsAreas = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var SaleAreas_1 = require("./SaleAreas");
var Salespersons_1 = require("./Salespersons");
var SalespersonsAreas = (function (_super) {
    tslib_1.__extends(SalespersonsAreas, _super);
    function SalespersonsAreas() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], SalespersonsAreas.prototype, "salespersonId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], SalespersonsAreas.prototype, "saleAreaId", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return SaleAreas_1.SaleAreas; }, function (saleAreas) { return saleAreas.salespersonsAreas; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'sale_area_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", SaleAreas_1.SaleAreas)
    ], SalespersonsAreas.prototype, "saleArea", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Salespersons_1.SalePerson; }, function (saleperson) { return saleperson.salespersonsAreas; }, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
        typeorm_1.JoinColumn([{ name: 'salesperson_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Salespersons_1.SalePerson)
    ], SalespersonsAreas.prototype, "salesperson", void 0);
    SalespersonsAreas = tslib_1.__decorate([
        typeorm_1.Index('salesperson_areas_UNIQUE', ['salespersonId', 'saleAreaId'], {
            unique: true,
        }),
        typeorm_1.Index('sale_area_id', ['saleAreaId'], {}),
        typeorm_1.Entity('salespersons_areas')
    ], SalespersonsAreas);
    return SalespersonsAreas;
}(Base_models_1.BaseModel));
exports.SalespersonsAreas = SalespersonsAreas;
//# sourceMappingURL=SalespersonsAreas.js.map