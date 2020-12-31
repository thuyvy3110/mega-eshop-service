"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsRepository = void 0;
var tslib_1 = require("tslib");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var Logs_1 = require("../models/entities/Logs");
var LogsRepository = (function (_super) {
    tslib_1.__extends(LogsRepository, _super);
    function LogsRepository() {
        return _super.call(this, Logs_1.Logs) || this;
    }
    LogsRepository.prototype.getLastCustomerId = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var latest;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.findOne({
                            order: {
                                id: 'DESC'
                            }
                        })];
                    case 1:
                        latest = _a.sent();
                        if (latest) {
                            return [2, +latest.customerId];
                        }
                        return [2, 0];
                }
            });
        });
    };
    return LogsRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.LogsRepository = LogsRepository;
//# sourceMappingURL=Logs.repository.js.map