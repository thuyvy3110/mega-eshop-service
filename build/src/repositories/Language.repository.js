"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageRepository = void 0;
var tslib_1 = require("tslib");
var Languages_1 = require("../models/entities/Languages");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var LanguageRepository = (function (_super) {
    tslib_1.__extends(LanguageRepository, _super);
    function LanguageRepository() {
        return _super.call(this, Languages_1.Languages) || this;
    }
    return LanguageRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.LanguageRepository = LanguageRepository;
//# sourceMappingURL=Language.repository.js.map