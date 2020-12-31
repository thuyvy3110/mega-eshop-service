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
    return ProductRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=Products.repository.js.map