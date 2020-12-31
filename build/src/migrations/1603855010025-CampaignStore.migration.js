"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignStore1603855010025 = void 0;
var tslib_1 = require("tslib");
var CampaignStore1603855010025 = (function () {
    function CampaignStore1603855010025() {
    }
    CampaignStore1603855010025.prototype.up = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query("\n\t\t\talter table campaign_stores\n    \t\t\tdrop index `campaign_id_UNIQUE`;\n\t\t\t")];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    CampaignStore1603855010025.prototype.down = function (queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, queryRunner.query('')];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return CampaignStore1603855010025;
}());
exports.CampaignStore1603855010025 = CampaignStore1603855010025;
//# sourceMappingURL=1603855010025-CampaignStore.migration.js.map