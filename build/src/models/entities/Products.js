"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var CampaignProducts_1 = require("./CampaignProducts");
var Categories_1 = require("./Categories");
var Clients_1 = require("./Clients");
var ProductImgs_1 = require("./ProductImgs");
var Products = (function (_super) {
    tslib_1.__extends(Products, _super);
    function Products() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column({ length: 200 }),
        tslib_1.__metadata("design:type", String)
    ], Products.prototype, "productName", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Products.prototype, "clientId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Products.prototype, "categoryId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], Products.prototype, "companyName", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], Products.prototype, "price", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 200 }),
        tslib_1.__metadata("design:type", String)
    ], Products.prototype, "url", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Products.prototype, "description", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Products.prototype, "memo", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return CampaignProducts_1.CampaignProducts; }, function (campaignProducts) { return campaignProducts.product; }),
        tslib_1.__metadata("design:type", Array)
    ], Products.prototype, "campaignProducts", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return ProductImgs_1.ProductImgs; }, function (productImgs) { return productImgs.product; }),
        tslib_1.__metadata("design:type", Array)
    ], Products.prototype, "productImgs", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Categories_1.Categories; }, function (categories) { return categories.products; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Categories_1.Categories)
    ], Products.prototype, "category", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Clients_1.Clients; }, function (clients) { return clients.products; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Clients_1.Clients)
    ], Products.prototype, "client", void 0);
    Products = tslib_1.__decorate([
        typeorm_1.Index('products_UNIQUE', ['productName', 'clientId', 'categoryId', 'companyName'], { unique: true }),
        typeorm_1.Index('fk_products_categories1_idx', ['categoryId'], {}),
        typeorm_1.Index('fk_products_clients1_idx', ['clientId'], {}),
        typeorm_1.Entity('products')
    ], Products);
    return Products;
}(Base_models_1.BaseModel));
exports.Products = Products;
//# sourceMappingURL=Products.js.map