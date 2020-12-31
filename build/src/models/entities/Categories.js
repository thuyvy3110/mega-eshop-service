"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Categories = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var Campaigns_1 = require("./Campaigns");
var Clients_1 = require("./Clients");
var Products_1 = require("./Products");
var Categories = (function (_super) {
    tslib_1.__extends(Categories, _super);
    function Categories() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column({ length: 50, }),
        tslib_1.__metadata("design:type", String)
    ], Categories.prototype, "categoryType", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100, }),
        tslib_1.__metadata("design:type", String)
    ], Categories.prototype, "campaignCategoryName", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Categories.prototype, "clientId", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return Campaigns_1.Campaigns; }, function (campaigns) { return campaigns.category; }),
        tslib_1.__metadata("design:type", Array)
    ], Categories.prototype, "campaigns", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Clients_1.Clients; }, function (clients) { return clients.categories; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Clients_1.Clients)
    ], Categories.prototype, "client", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return Products_1.Products; }, function (products) { return products.category; }),
        tslib_1.__metadata("design:type", Array)
    ], Categories.prototype, "products", void 0);
    Categories = tslib_1.__decorate([
        typeorm_1.Index('categories_UNIQUE', ['categoryType', 'campaignCategoryName'], {
            unique: true,
        }),
        typeorm_1.Index('fk_categories_clients1_idx', ['clientId'], {}),
        typeorm_1.Entity('categories')
    ], Categories);
    return Categories;
}(Base_models_1.BaseModel));
exports.Categories = Categories;
//# sourceMappingURL=Categories.js.map