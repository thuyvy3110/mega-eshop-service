"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRepository = void 0;
var tslib_1 = require("tslib");
var Categories_1 = require("../models/entities/Categories");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var CategoriesRepository = (function (_super) {
    tslib_1.__extends(CategoriesRepository, _super);
    function CategoriesRepository() {
        return _super.call(this, Categories_1.Categories) || this;
    }
    CategoriesRepository.prototype.getTypeCampaign = function (clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getType(clientId, 'campaign')];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    CategoriesRepository.prototype.getTypeScenario = function (clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getType(clientId, 'scenario')];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    CategoriesRepository.prototype.getTypeProduct = function (clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getType(clientId, 'product')];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    CategoriesRepository.prototype.getType = function (clientId, type) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.find({
                            where: {
                                'clientId': clientId,
                                'categoryType': type
                            }
                        })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return CategoriesRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.CategoriesRepository = CategoriesRepository;
//# sourceMappingURL=Categories.repository.js.map