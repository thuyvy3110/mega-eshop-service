"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logs = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var Logs = (function (_super) {
    tslib_1.__extends(Logs, _super);
    function Logs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Logs.prototype, "storeId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Logs.prototype, "customerId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Logs.prototype, "tappedNodeId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Logs.prototype, "videoCallingId", void 0);
    Logs = tslib_1.__decorate([
        typeorm_1.Entity('logs')
    ], Logs);
    return Logs;
}(Base_models_1.BaseModel));
exports.Logs = Logs;
//# sourceMappingURL=Logs.js.map