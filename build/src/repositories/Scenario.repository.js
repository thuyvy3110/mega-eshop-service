"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenarioRepository = void 0;
var tslib_1 = require("tslib");
var Scenarios_1 = require("../models/entities/Scenarios");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var axios_1 = tslib_1.__importDefault(require("axios"));
var ScenarioRepository = (function (_super) {
    tslib_1.__extends(ScenarioRepository, _super);
    function ScenarioRepository() {
        return _super.call(this, Scenarios_1.Scenarios) || this;
    }
    ScenarioRepository.prototype.customMethod = function (clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, 'custom'];
            });
        });
    };
    ScenarioRepository.prototype.getScenarioWithoutLevel1 = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var json;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, axios_1.default.get("https://script.google.com/macros/s/" + process.env.GOOGLE_APP_SCRIPT_ID + "/exec?method=combineScenarioWithoutNode1")];
                    case 1:
                        json = _a.sent();
                        return [2, json.data];
                }
            });
        });
    };
    return ScenarioRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.ScenarioRepository = ScenarioRepository;
//# sourceMappingURL=Scenario.repository.js.map