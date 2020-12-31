"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnToSalespersons1604655977157 = void 0;
var tslib_1 = require("tslib");
var AddColumnToSalespersons1604655977157 = (function () {
    function AddColumnToSalespersons1604655977157() {
    }
    AddColumnToSalespersons1604655977157.prototype.up = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query('ALTER TABLE salespersons ADD COLUMN account VARCHAR(100) NOT NULL AFTER name')];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    AddColumnToSalespersons1604655977157.prototype.down = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query('ALTER TABLE salespersons DROP COLUMN account')];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return AddColumnToSalespersons1604655977157;
}());
exports.AddColumnToSalespersons1604655977157 = AddColumnToSalespersons1604655977157;
//# sourceMappingURL=1604655977157-AddColumnToSalespersons.js.map