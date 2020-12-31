"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ProductImgs_1 = require("../models/entities/ProductImgs");
var ProductImgs_repository_1 = require("../repositories/ProductImgs.repository");
var Base_controller_1 = require("./Base.controller");
var ProductImgController = (function (_super) {
    tslib_1.__extends(ProductImgController, _super);
    function ProductImgController() {
        return _super.call(this, ProductImgs_1.ProductImgs, '/vs/product-image') || this;
    }
    ProductImgController.prototype.initRepository = function () {
        return new ProductImgs_repository_1.ProductImgsRepository();
    };
    ProductImgController.prototype.customRoutes = function () {
        return;
    };
    return ProductImgController;
}(Base_controller_1.BaseController));
exports.default = ProductImgController;
//# sourceMappingURL=ProductImg.controller.js.map