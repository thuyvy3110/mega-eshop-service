"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductImgsRepository = void 0;
var tslib_1 = require("tslib");
var ProductImgs_1 = require("../models/entities/ProductImgs");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var ProductImgsRepository = (function (_super) {
    tslib_1.__extends(ProductImgsRepository, _super);
    function ProductImgsRepository() {
        return _super.call(this, ProductImgs_1.ProductImgs) || this;
    }
    return ProductImgsRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.ProductImgsRepository = ProductImgsRepository;
//# sourceMappingURL=ProductImgs.repository.js.map