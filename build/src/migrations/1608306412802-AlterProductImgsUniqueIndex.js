"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterProductImgsUniqueIndex1608306412802 = void 0;
var tslib_1 = require("tslib");
var AlterProductImgsUniqueIndex1608306412802 = (function () {
    function AlterProductImgsUniqueIndex1608306412802() {
    }
    AlterProductImgsUniqueIndex1608306412802.prototype.up = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("ALTER TABLE `product_imgs` DROP INDEX `product_imgs_UNIQUE`;")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    AlterProductImgsUniqueIndex1608306412802.prototype.down = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("ALTER TABLE `product_imgs` ADD UNIQUE INDEX `product_imgs_UNIQUE` (`product_id`, `img`);")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return AlterProductImgsUniqueIndex1608306412802;
}());
exports.AlterProductImgsUniqueIndex1608306412802 = AlterProductImgsUniqueIndex1608306412802;
//# sourceMappingURL=1608306412802-AlterProductImgsUniqueIndex.js.map