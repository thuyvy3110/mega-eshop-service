"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterTableCharacteSetUtf81607311588450 = void 0;
var tslib_1 = require("tslib");
var AlterTableCharacteSetUtf81607311588450 = (function () {
    function AlterTableCharacteSetUtf81607311588450() {
    }
    AlterTableCharacteSetUtf81607311588450.prototype.up = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("ALTER TABLE scenario_initial_movies CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;")];
                    case 1:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE languages CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;")];
                    case 2:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE migrations CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;")];
                    case 3:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE sale_areas CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;")];
                    case 4:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE logs CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;")];
                    case 5:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    AlterTableCharacteSetUtf81607311588450.prototype.down = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2];
            });
        });
    };
    return AlterTableCharacteSetUtf81607311588450;
}());
exports.AlterTableCharacteSetUtf81607311588450 = AlterTableCharacteSetUtf81607311588450;
//# sourceMappingURL=1607311588450-AlterTableCharacteSetUtf8.js.map