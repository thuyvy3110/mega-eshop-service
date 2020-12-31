"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var lodash_1 = tslib_1.__importDefault(require("lodash"));
var typeorm_1 = require("typeorm");
var Categories_1 = require("../models/entities/Categories");
var Categories_repository_1 = require("../repositories/Categories.repository");
var Base_controller_1 = require("./Base.controller");
var CategoryController = (function (_super) {
    tslib_1.__extends(CategoryController, _super);
    function CategoryController() {
        var _this = _super.call(this, Categories_1.Categories, '/vs/category') || this;
        _this.getCategoriesByType = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var clientId, parentClientId, categories, _a, error_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.findClientId(request)];
                    case 1:
                        clientId = _b.sent();
                        return [4, this.findParentClientIdFirst(request)];
                    case 2:
                        parentClientId = _b.sent();
                        console.log('FindOne params type: ', request.params.categoryType);
                        if (lodash_1.default.isEmpty(request.params.categoryType)) {
                            return [2, response.status(400).json({ status: 'empty category type', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND })];
                        }
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 8, , 9]);
                        categories = void 0;
                        _a = request.params.categoryType;
                        switch (_a) {
                            case 'campaign': return [3, 4];
                            case 'scenario': return [3, 4];
                            case 'product': return [3, 4];
                            case 'speciality': return [3, 4];
                        }
                        return [3, 6];
                    case 4: return [4, typeorm_1.getRepository(this.entity).createQueryBuilder()
                            .where('client_id in (:clientId, :parentClientId) and category_type = :categoryType', { clientId: clientId, parentClientId: parentClientId, categoryType: request.params.categoryType })
                            .orderBy('updated_at', 'DESC')
                            .getMany()];
                    case 5:
                        categories = _b.sent();
                        return [3, 7];
                    case 6: return [2, response.status(400).json({ status: 'category type wrong', err_code: this.errCode.ERROR_ENTRY_NOT_FOUND })];
                    case 7: return [2, response.status(200).json({ categories: categories })];
                    case 8:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 9: return [2];
                }
            });
        }); };
        return _this;
    }
    CategoryController.prototype.initRepository = function () {
        return new Categories_repository_1.CategoriesRepository();
    };
    CategoryController.prototype.customRoutes = function () {
        var _this = this;
        this.router.get(this.path + '/type/:categoryType', function (req, res) { return _this.getCategoriesByType(req, res); });
    };
    return CategoryController;
}(Base_controller_1.BaseController));
exports.default = CategoryController;
//# sourceMappingURL=Category.controller.js.map