"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditableModel = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var AuditableModel = (function () {
    function AuditableModel() {
    }
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], AuditableModel.prototype, "createdBy", void 0);
    tslib_1.__decorate([
        typeorm_1.CreateDateColumn(),
        tslib_1.__metadata("design:type", Object)
    ], AuditableModel.prototype, "createdAt", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], AuditableModel.prototype, "updatedBy", void 0);
    tslib_1.__decorate([
        typeorm_1.UpdateDateColumn(),
        tslib_1.__metadata("design:type", Object)
    ], AuditableModel.prototype, "updatedAt", void 0);
    return AuditableModel;
}());
exports.AuditableModel = AuditableModel;
//# sourceMappingURL=Auditable.models.js.map