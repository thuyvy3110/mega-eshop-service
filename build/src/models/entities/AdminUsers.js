"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUsers = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var Clients_1 = require("./Clients");
var AdminUsers = (function (_super) {
    tslib_1.__extends(AdminUsers, _super);
    function AdminUsers() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], AdminUsers.prototype, "account", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ nullable: true, length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], AdminUsers.prototype, "name", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('bigint', { name: 'client_id' }),
        tslib_1.__metadata("design:type", Number)
    ], AdminUsers.prototype, "clientId", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Clients_1.Clients; }, function (clients) { return clients.adminUsers; }, {
            onDelete: 'NO ACTION',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Clients_1.Clients)
    ], AdminUsers.prototype, "client", void 0);
    AdminUsers = tslib_1.__decorate([
        typeorm_1.Index('users_UNIQUE', ['account', 'clientId'], { unique: true }),
        typeorm_1.Index('fk_admin_users_clients1_idx', ['clientId'], {}),
        typeorm_1.Entity('admin_users')
    ], AdminUsers);
    return AdminUsers;
}(Base_models_1.BaseModel));
exports.AdminUsers = AdminUsers;
//# sourceMappingURL=AdminUsers.js.map