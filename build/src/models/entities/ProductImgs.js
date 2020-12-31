"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImgs = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var Products_1 = require("./Products");
var ProductImgs = (function (_super) {
    tslib_1.__extends(ProductImgs, _super);
    function ProductImgs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], ProductImgs.prototype, "productId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 200 }),
        tslib_1.__metadata("design:type", String)
    ], ProductImgs.prototype, "img", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 45 }),
        tslib_1.__metadata("design:type", String)
    ], ProductImgs.prototype, "fieldName", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Products_1.Products; }, function (products) { return products.productImgs; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Products_1.Products)
    ], ProductImgs.prototype, "product", void 0);
    ProductImgs = tslib_1.__decorate([
        typeorm_1.Index('product_id_field_name_UNIQUE', ['productId', 'fieldName'], { unique: true }),
        typeorm_1.Entity('product_imgs')
    ], ProductImgs);
    return ProductImgs;
}(Base_models_1.BaseModel));
exports.ProductImgs = ProductImgs;
//# sourceMappingURL=ProductImgs.js.map