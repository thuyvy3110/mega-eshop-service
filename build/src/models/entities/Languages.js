"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Languages = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var Clients_1 = require("./Clients");
var Languages = (function (_super) {
    tslib_1.__extends(Languages, _super);
    function Languages() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], Languages.prototype, "language", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return Clients_1.Clients; }, function (clients) { return clients.languageType2; }),
        tslib_1.__metadata("design:type", Array)
    ], Languages.prototype, "clients", void 0);
    Languages = tslib_1.__decorate([
        typeorm_1.Index('language_UNIQUE', ['language'], { unique: true }),
        typeorm_1.Entity('languages')
    ], Languages);
    return Languages;
}(Base_models_1.BaseModel));
exports.Languages = Languages;
//# sourceMappingURL=Languages.js.map