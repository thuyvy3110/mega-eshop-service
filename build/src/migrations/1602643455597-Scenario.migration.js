"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scenario1602643455597 = void 0;
var tslib_1 = require("tslib");
var Scenario1602643455597 = (function () {
    function Scenario1602643455597() {
    }
    Scenario1602643455597.prototype.up = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("\n\t\t\tCREATE TABLE IF NOT EXISTS scenarios(\n\t\t\t\tid INT(20) AUTO_INCREMENT PRIMARY KEY,\n\t\t\t\tscenario_name VARCHAR(200),\n\t\t\t\tclient_id BIGINT(20) NOT NULL COMMENT '\u30AF\u30E9\u30A4\u30A2\u30F3\u30C8ID',\n\t\t\t\tcategory_id INT(8) NOT NULL DEFAULT 0,\n\t\t\t\tcampaign_id INT(20) NOT NULL DEFAULT 0,\n\t\t\t\tcontent TEXT,\n\t\t\t\tupdated_by VARCHAR(100) NOT NULL COMMENT '\u66F4\u65B0\u8005',\n\t\t\t\tupdated_at DATETIME NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '\u66F4\u65B0\u65E5',\n  \t\t\t\tcreated_bY VARCHAR(100) NOT NULL COMMENT '\u767B\u9332\u8005',\n  \t\t\t\tcreated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '\u767B\u9332\u65E5',\n\t\t\t\t  UNIQUE INDEX scenarios_UNIQUE (scenario_name ASC, client_id ASC),\n\t\t\t\t  INDEX fk_scenarios_clients1_idx (client_id ASC),\n\t\t\t\t  CONSTRAINT fk_scenarios_clients1 FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE NO ACTION ON UPDATE NO ACTION\n\t\t\t\t) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;\n\t\t\t")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    Scenario1602643455597.prototype.down = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query('DROP TABLE IF EXISTS scenarios;')];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return Scenario1602643455597;
}());
exports.Scenario1602643455597 = Scenario1602643455597;
//# sourceMappingURL=1602643455597-Scenario.migration.js.map