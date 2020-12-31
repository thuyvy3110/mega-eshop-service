"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterSalespersonsAlterSpecialtyCategory1608694655989 = void 0;
var tslib_1 = require("tslib");
var AlterSalespersonsAlterSpecialtyCategory1608694655989 = (function () {
    function AlterSalespersonsAlterSpecialtyCategory1608694655989() {
    }
    AlterSalespersonsAlterSpecialtyCategory1608694655989.prototype.up = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("ALTER TABLE `salespersons` CHANGE COLUMN `specialty_category` `category_id` BIGINT(20) NULL DEFAULT NULL COMMENT '\u5F97\u610F\u5206\u91CE' ;")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    AlterSalespersonsAlterSpecialtyCategory1608694655989.prototype.down = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2];
            });
        });
    };
    return AlterSalespersonsAlterSpecialtyCategory1608694655989;
}());
exports.AlterSalespersonsAlterSpecialtyCategory1608694655989 = AlterSalespersonsAlterSpecialtyCategory1608694655989;
//# sourceMappingURL=1608694655989-AlterSalespersonsAlterSpecialtyCategory.js.map