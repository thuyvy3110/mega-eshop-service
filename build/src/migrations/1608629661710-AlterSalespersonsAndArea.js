"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterSalespersonsAndArea1608629661710 = void 0;
var tslib_1 = require("tslib");
var AlterSalespersonsAndArea1608629661710 = (function () {
    function AlterSalespersonsAndArea1608629661710() {
    }
    AlterSalespersonsAndArea1608629661710.prototype.up = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("SET FOREIGN_KEY_CHECKS = 0;")];
                    case 1:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE `salespersons` DROP COLUMN `area`;")];
                    case 2:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE `sale_areas` CHANGE COLUMN `id` `id` BIGINT(20) NOT NULL AUTO_INCREMENT ;")];
                    case 3:
                        _a.sent();
                        return [4, queryRunner.query("SET FOREIGN_KEY_CHECKS = 1;")];
                    case 4:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    AlterSalespersonsAndArea1608629661710.prototype.down = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("ALTER TABLE `salespersons` ADD COLUMN `area` VARCHAR(200);")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return AlterSalespersonsAndArea1608629661710;
}());
exports.AlterSalespersonsAndArea1608629661710 = AlterSalespersonsAndArea1608629661710;
//# sourceMappingURL=1608629661710-AlterSalespersonsAndArea.js.map