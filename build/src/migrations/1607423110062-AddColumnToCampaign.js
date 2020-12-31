"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddColumnToCampaign1607423110062 = void 0;
var tslib_1 = require("tslib");
var AddColumnToCampaign1607423110062 = (function () {
    function AddColumnToCampaign1607423110062() {
    }
    AddColumnToCampaign1607423110062.prototype.up = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("ALTER TABLE campaigns\n                                    ADD COLUMN `periods`        TEXT default NULL,\n                                    ADD COLUMN goods        TEXT default NULL,\n                                    ADD COLUMN due_date TEXT default NULL,\n                                    ADD COLUMN image1       TEXT default NULL,\n                                    ADD COLUMN image2       TEXT default NULL,\n                                    ADD COLUMN image3       TEXT default NULL,\n                                    ADD COLUMN image4       TEXT default NULL,\n                                    ADD COLUMN image5       TEXT default NULL;")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    AddColumnToCampaign1607423110062.prototype.down = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("ALTER TABLE campaigns\n                                    DROP COLUMN `periods`,\n                                    DROP COLUMN goods,\n                                    DROP COLUMN due_date,\n                                    DROP COLUMN image1,\n                                    DROP COLUMN image2,\n                                    DROP COLUMN image3,\n                                    DROP COLUMN image4,\n                                    DROP COLUMN image5;")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return AddColumnToCampaign1607423110062;
}());
exports.AddColumnToCampaign1607423110062 = AddColumnToCampaign1607423110062;
//# sourceMappingURL=1607423110062-AddColumnToCampaign.js.map