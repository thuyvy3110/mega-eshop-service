"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalespersonsAreasRepository = void 0;
var tslib_1 = require("tslib");
var SalespersonsAreas_1 = require("../models/entities/SalespersonsAreas");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var SalespersonsAreasRepository = (function (_super) {
    tslib_1.__extends(SalespersonsAreasRepository, _super);
    function SalespersonsAreasRepository() {
        return _super.call(this, SalespersonsAreas_1.SalespersonsAreas) || this;
    }
    SalespersonsAreasRepository.prototype.saveBySalespersonId = function (salespersonId, saleAreaIds, account) {
        var _this = this;
        saleAreaIds.map(function (saleAreaId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var record;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        record = new SalespersonsAreas_1.SalespersonsAreas();
                        record.saleAreaId = saleAreaId;
                        record.salespersonId = salespersonId;
                        record.updatedBy = account;
                        record.createdBy = account;
                        return [4, this.repository.save(record)];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); });
    };
    SalespersonsAreasRepository.prototype.deleteBySalespersonId = function (salespersonId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.delete({ 'salespersonId': salespersonId })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return SalespersonsAreasRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.SalespersonsAreasRepository = SalespersonsAreasRepository;
//# sourceMappingURL=SalespersonsAreas.repository.js.map