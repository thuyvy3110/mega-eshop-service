"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterProductImgsTable1608281071760 = void 0;
var tslib_1 = require("tslib");
var AlterProductImgsTable1608281071760 = (function () {
    function AlterProductImgsTable1608281071760() {
    }
    AlterProductImgsTable1608281071760.prototype.up = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("ALTER TABLE `product_imgs` ADD COLUMN `field_name` VARCHAR(45) NOT NULL AFTER `product_id`;")];
                    case 1:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE `product_imgs` ADD UNIQUE INDEX `product_id_field_name_UNIQUE` (`product_id`, `field_name`);")];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    AlterProductImgsTable1608281071760.prototype.down = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("ALTER TABLE `product_imgs` DROP COLUMN `field_name`;")];
                    case 1:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE `product_imgs` DROP INDEX `product_id_field_name_UNIQUE`;")];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return AlterProductImgsTable1608281071760;
}());
exports.AlterProductImgsTable1608281071760 = AlterProductImgsTable1608281071760;
//# sourceMappingURL=1608281071760-AlterProductImgsTable.js.map