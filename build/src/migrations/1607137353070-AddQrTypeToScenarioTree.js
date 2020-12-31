"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddQrTypeToScenarioTree1607137353070 = void 0;
var tslib_1 = require("tslib");
var AddQrTypeToScenarioTree1607137353070 = (function () {
    function AddQrTypeToScenarioTree1607137353070() {
    }
    AddQrTypeToScenarioTree1607137353070.prototype.up = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("ALTER TABLE scenario_trees ADD COLUMN scenario_reference varchar(100) default '';")];
                    case 1:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE scenario_trees ADD COLUMN scenario_reference_id BIGINT(20);")];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    AddQrTypeToScenarioTree1607137353070.prototype.down = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("ALTER TABLE scenario_trees DROP COLUMN scenario_reference;")];
                    case 1:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE scenario_trees DROP COLUMN scenario_reference_id;")];
                    case 2:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return AddQrTypeToScenarioTree1607137353070;
}());
exports.AddQrTypeToScenarioTree1607137353070 = AddQrTypeToScenarioTree1607137353070;
//# sourceMappingURL=1607137353070-AddQrTypeToScenarioTree.js.map