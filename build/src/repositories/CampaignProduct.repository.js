"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignProductRepository = void 0;
var tslib_1 = require("tslib");
var CampaignProducts_1 = require("../models/entities/CampaignProducts");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var CampaignProductRepository = (function (_super) {
    tslib_1.__extends(CampaignProductRepository, _super);
    function CampaignProductRepository() {
        return _super.call(this, CampaignProducts_1.CampaignProducts) || this;
    }
    CampaignProductRepository.prototype.get = function (clientId) {
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
    CampaignProductRepository.prototype.save = function (campaignId, productIds, account) {
        var _this = this;
        productIds.map(function (productId) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var record;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        record = new CampaignProducts_1.CampaignProducts();
                        record.campaignId = campaignId;
                        record.productId = productId;
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
    CampaignProductRepository.prototype.delete = function (campaignId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.delete({ 'campaignId': campaignId })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return CampaignProductRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.CampaignProductRepository = CampaignProductRepository;
//# sourceMappingURL=CampaignProduct.repository.js.map