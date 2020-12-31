"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Languages_1 = require("../models/entities/Languages");
var Language_repository_1 = require("../repositories/Language.repository");
var Base_controller_1 = require("./Base.controller");
var LanguageController = (function (_super) {
    tslib_1.__extends(LanguageController, _super);
    function LanguageController() {
        return _super.call(this, Languages_1.Languages, '/vs/language') || this;
    }
    LanguageController.prototype.initRepository = function () {
        return new Language_repository_1.LanguageRepository();
    };
    LanguageController.prototype.customRoutes = function () {
        return;
    };
    return LanguageController;
}(Base_controller_1.BaseController));
exports.default = LanguageController;
//# sourceMappingURL=Language.controller.js.map