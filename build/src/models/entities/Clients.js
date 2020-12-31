"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clients = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var AdminUsers_1 = require("./AdminUsers");
var Campaigns_1 = require("./Campaigns");
var Categories_1 = require("./Categories");
var Languages_1 = require("./Languages");
var Products_1 = require("./Products");
var Salespersons_1 = require("./Salespersons");
var Scenarios_1 = require("./Scenarios");
var Stores_1 = require("./Stores");
var Clients = (function (_super) {
    tslib_1.__extends(Clients, _super);
    function Clients() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], Clients.prototype, "name", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], Clients.prototype, "type", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Clients.prototype, "languageType", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Clients.prototype, "parentType", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Clients.prototype, "parentClientId", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return AdminUsers_1.AdminUsers; }, function (adminUsers) { return adminUsers.client; }),
        tslib_1.__metadata("design:type", Array)
    ], Clients.prototype, "adminUsers", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return Campaigns_1.Campaigns; }, function (campaigns) { return campaigns.client; }),
        tslib_1.__metadata("design:type", Array)
    ], Clients.prototype, "campaigns", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return Categories_1.Categories; }, function (categories) { return categories.client; }),
        tslib_1.__metadata("design:type", Array)
    ], Clients.prototype, "categories", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Languages_1.Languages; }, function (languages) { return languages.clients; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'language_type', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Languages_1.Languages)
    ], Clients.prototype, "languageType2", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return Products_1.Products; }, function (products) { return products.client; }),
        tslib_1.__metadata("design:type", Array)
    ], Clients.prototype, "products", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return Salespersons_1.SalePerson; }, function (saleperson) { return saleperson.client; }),
        tslib_1.__metadata("design:type", Array)
    ], Clients.prototype, "salespersons", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return Scenarios_1.Scenarios; }, function (scenarios) { return scenarios.client; }),
        tslib_1.__metadata("design:type", Array)
    ], Clients.prototype, "scenarios", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return Stores_1.Stores; }, function (stores) { return stores.client; }),
        tslib_1.__metadata("design:type", Array)
    ], Clients.prototype, "stores", void 0);
    Clients = tslib_1.__decorate([
        typeorm_1.Index('client_roles_UNIQUE', ['name'], { unique: true }),
        typeorm_1.Entity('clients')
    ], Clients);
    return Clients;
}(Base_models_1.BaseModel));
exports.Clients = Clients;
//# sourceMappingURL=Clients.js.map