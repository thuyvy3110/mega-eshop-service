"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Auditable_models_1 = require("./Auditable.models");
var BaseModel = (function (_super) {
    tslib_1.__extends(BaseModel, _super);
    function BaseModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryGeneratedColumn({ name: 'id', type: 'bigint' }),
        tslib_1.__metadata("design:type", Number)
    ], BaseModel.prototype, "id", void 0);
    return BaseModel;
}(Auditable_models_1.AuditableModel));
exports.BaseModel = BaseModel;
//# sourceMappingURL=Base.models.js.map