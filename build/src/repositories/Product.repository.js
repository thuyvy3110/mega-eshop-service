"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
var tslib_1 = require("tslib");
var Products_1 = require("../models/entities/Products");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var ProductRepository = (function (_super) {
    tslib_1.__extends(ProductRepository, _super);
    function ProductRepository() {
        return _super.call(this, Products_1.Products) || this;
    }
    ProductRepository.prototype.get = function (clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.find({
                            where: {
                                'clientId': clientId
                            }
                        })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return ProductRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=Product.repository.js.map