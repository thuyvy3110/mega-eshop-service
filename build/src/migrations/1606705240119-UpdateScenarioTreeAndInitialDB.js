"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateScenarioTreeAndInitialDB1606705240119 = void 0;
var tslib_1 = require("tslib");
var UpdateScenarioTreeAndInitialDB1606705240119 = (function () {
    function UpdateScenarioTreeAndInitialDB1606705240119() {
    }
    UpdateScenarioTreeAndInitialDB1606705240119.prototype.up = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("ALTER TABLE scenario_initial_movies DROP FOREIGN KEY `fk_scenario_initial_movies_scenarios1`;")];
                    case 1:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE scenario_trees DROP FOREIGN KEY `fk_scenario_trees_scenarios1`;")];
                    case 2:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE scenario_initial_movies ADD CONSTRAINT `fk_scenario_initial_movies_scenarios1`\n    FOREIGN KEY (`scenario_id`)\n    REFERENCES `scenarios` (`id`)\n    ON DELETE CASCADE\n    ON UPDATE NO ACTION;")];
                    case 3:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE scenario_trees ADD CONSTRAINT `fk_scenario_trees_scenarios1`\n    FOREIGN KEY (`scenario_id`)\n    REFERENCES `scenarios` (`id`)\n    ON DELETE CASCADE\n    ON UPDATE NO ACTION;")];
                    case 4:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE scenario_trees ADD COLUMN mpath varchar(100) default '';")];
                    case 5:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE scenario_initial_movies ADD COLUMN disp_value varchar(100) default '';")];
                    case 6:
                        _a.sent();
                        return [4, queryRunner.query("ALTER TABLE scenario_initial_movies MODIFY id int auto_increment")];
                    case 7:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    UpdateScenarioTreeAndInitialDB1606705240119.prototype.down = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2];
            });
        });
    };
    return UpdateScenarioTreeAndInitialDB1606705240119;
}());
exports.UpdateScenarioTreeAndInitialDB1606705240119 = UpdateScenarioTreeAndInitialDB1606705240119;
//# sourceMappingURL=1606705240119-UpdateScenarioTreeAndInitialDB.js.map