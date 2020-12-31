"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalePerson = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var OneToOne_1 = require("typeorm/decorator/relations/OneToOne");
var Base_models_1 = require("../Base.models");
var Categories_1 = require("./Categories");
var Clients_1 = require("./Clients");
var SalespersonsAreas_1 = require("./SalespersonsAreas");
var StoreSalespersons_1 = require("./StoreSalespersons");
var VideoCalling_1 = require("./VideoCalling");
var SalePerson = (function (_super) {
    tslib_1.__extends(SalePerson, _super);
    function SalePerson() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], SalePerson.prototype, "name", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], SalePerson.prototype, "clientId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], SalePerson.prototype, "account", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 10 }),
        tslib_1.__metadata("design:type", String)
    ], SalePerson.prototype, "evaluation", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], SalePerson.prototype, "company", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 200 }),
        tslib_1.__metadata("design:type", String)
    ], SalePerson.prototype, "contactInformation", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], SalePerson.prototype, "officer", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], SalePerson.prototype, "categoryId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], SalePerson.prototype, "memo", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], SalePerson.prototype, "area", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Clients_1.Clients; }, function (clients) { return clients.salespersons; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Clients_1.Clients)
    ], SalePerson.prototype, "client", void 0);
    tslib_1.__decorate([
        OneToOne_1.OneToOne(function () { return Categories_1.Categories; }),
        typeorm_1.JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Categories_1.Categories)
    ], SalePerson.prototype, "category", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return SalespersonsAreas_1.SalespersonsAreas; }, function (salespersonsAreas) { return salespersonsAreas.salesperson; }),
        tslib_1.__metadata("design:type", Array)
    ], SalePerson.prototype, "salespersonsAreas", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return StoreSalespersons_1.StoreSalespersons; }, function (storeSalespersons) { return storeSalespersons.salesperson; }),
        tslib_1.__metadata("design:type", Array)
    ], SalePerson.prototype, "storeSalespersons", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return VideoCalling_1.VideoCalling; }, function (videoCalling) { return videoCalling.salesperson; }),
        tslib_1.__metadata("design:type", Array)
    ], SalePerson.prototype, "videoCallings", void 0);
    SalePerson = tslib_1.__decorate([
        typeorm_1.Index('salespersons_UNIQUE', ['name', 'clientId'], { unique: true }),
        typeorm_1.Index('fk_salespersons_clients1_idx', ['clientId'], {}),
        typeorm_1.Index('fk_salespersons_category_idx', ['categoryId'], {}),
        typeorm_1.Entity('salespersons')
    ], SalePerson);
    return SalePerson;
}(Base_models_1.BaseModel));
exports.SalePerson = SalePerson;
//# sourceMappingURL=Salespersons.js.map