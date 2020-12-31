"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleAreas = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var SalespersonsAreas_1 = require("./SalespersonsAreas");
var SaleAreas = (function (_super) {
    tslib_1.__extends(SaleAreas, _super);
    function SaleAreas() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column('bigint', { name: 'client_id' }),
        tslib_1.__metadata("design:type", String)
    ], SaleAreas.prototype, "clientId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('varchar', { name: 'area', length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], SaleAreas.prototype, "area", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return SalespersonsAreas_1.SalespersonsAreas; }, function (salespersonsAreas) { return salespersonsAreas.saleArea; }),
        tslib_1.__metadata("design:type", Array)
    ], SaleAreas.prototype, "salespersonsAreas", void 0);
    SaleAreas = tslib_1.__decorate([
        typeorm_1.Index('sale_area_INDEX', ['clientId', 'area'], { unique: true }),
        typeorm_1.Entity('sale_areas')
    ], SaleAreas);
    return SaleAreas;
}(Base_models_1.BaseModel));
exports.SaleAreas = SaleAreas;
//# sourceMappingURL=SaleAreas.js.map