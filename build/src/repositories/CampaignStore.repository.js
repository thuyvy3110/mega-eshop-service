"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignStoreRepository = void 0;
var tslib_1 = require("tslib");
var CampaignStores_1 = require("../models/entities/CampaignStores");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var CampaignStoreRepository = (function (_super) {
    tslib_1.__extends(CampaignStoreRepository, _super);
    function CampaignStoreRepository() {
        return _super.call(this, CampaignStores_1.CampaignStores) || this;
    }
    CampaignStoreRepository.prototype.get = function (clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.find({
                            where: {
                                clientId: clientId
                            }
                        })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    CampaignStoreRepository.prototype.save = function (campaignId, storeIds, account) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                storeIds.map(function (storeId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var record;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                record = new CampaignStores_1.CampaignStores();
                                record.campaignId = campaignId;
                                record.storeId = storeId;
                                record.createdBy = account;
                                record.updatedBy = account;
                                return [4, this.repository.save(record)];
                            case 1:
                                _a.sent();
                                return [2];
                        }
                    });
                }); });
                return [2];
            });
        });
    };
    CampaignStoreRepository.prototype.delete = function (campaignId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.delete({ 'campaignId': campaignId })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return CampaignStoreRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.CampaignStoreRepository = CampaignStoreRepository;
//# sourceMappingURL=CampaignStore.repository.js.map