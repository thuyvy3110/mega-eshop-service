"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scenario1605774395815 = void 0;
var tslib_1 = require("tslib");
var Scenario1605774395815 = (function () {
    function Scenario1605774395815() {
    }
    Scenario1605774395815.prototype.up = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("\n\t\t\tALTER TABLE scenarios\n\t\t\tADD COLUMN content TEXT AFTER client_id,\n\t\t\tADD COLUMN campaign_id BIGINT(20) NOT NULL AFTER client_id,\n\t\t\tADD COLUMN category_id BIGINT(20) NOT NULL AFTER client_id,\n\t\t\tADD CONSTRAINT fk_scenarios_campaign FOREIGN KEY (campaign_id) REFERENCES campaigns(id),\n\t\t\tADD CONSTRAINT fk_scenarios_category FOREIGN KEY (category_id) REFERENCES categories(id);\n\t\t\t")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Scenario1605774395815.prototype.down = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("\n\t\t\tALTER TABLE scenarios DROP FOREIGN KEY fk_scenarios_campaign;\n\t\t\tALTER TABLE scenarios DROP FOREIGN KEY fk_scenarios_category;\n\t\t\tALTER TABLE scenarios DROP COLUMN category_id;\n\t\t\tALTER TABLE scenarios DROP COLUMN campaign_id;\n\t\t\tALTER TABLE scenarios DROP COLUMN content;\n\t\t\t")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return Scenario1605774395815;
}());
exports.Scenario1605774395815 = Scenario1605774395815;
//# sourceMappingURL=1605774395815-AddColumnToScenarios.js.map