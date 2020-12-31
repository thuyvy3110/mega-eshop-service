"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterSalespersonsAlterFkIndex1608700066050 = void 0;
var tslib_1 = require("tslib");
var AlterSalespersonsAlterFkIndex1608700066050 = (function () {
    function AlterSalespersonsAlterFkIndex1608700066050() {
    }
    AlterSalespersonsAlterFkIndex1608700066050.prototype.up = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("ALTER TABLE `salespersons` ADD INDEX `fk_salespersons_category_idx` (`category_id` ASC);")];
                    case 1:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE `salespersons` ADD CONSTRAINT `fk_salespersons_category`\n        FOREIGN KEY (`category_id`)\n        REFERENCES `categories` (`id`)\n        ON DELETE NO ACTION\n        ON UPDATE NO ACTION;")];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    AlterSalespersonsAlterFkIndex1608700066050.prototype.down = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2];
            });
        });
    };
    return AlterSalespersonsAlterFkIndex1608700066050;
}());
exports.AlterSalespersonsAlterFkIndex1608700066050 = AlterSalespersonsAlterFkIndex1608700066050;
//# sourceMappingURL=1608700066050-AlterSalespersonsAlterFkIndex.js.map