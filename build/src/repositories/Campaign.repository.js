"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignRepository = void 0;
var tslib_1 = require("tslib");
var moment_1 = tslib_1.__importDefault(require("moment"));
var Campaigns_1 = require("../models/entities/Campaigns");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var CampaignRepository = (function (_super) {
    tslib_1.__extends(CampaignRepository, _super);
    function CampaignRepository() {
        return _super.call(this, Campaigns_1.Campaigns) || this;
    }
    CampaignRepository.prototype.getStatusInActiveList = function (clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var baseDate;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseDate = moment_1.default(Date.now()).toISOString();
                        return [4, this.repository
                                .createQueryBuilder('campaigns')
                                .innerJoinAndSelect('campaigns.category', 'category')
                                .where('campaigns.client_id = :client_id', { client_id: clientId })
                                .andWhere('(campaigns.end_date < :base_date)', { base_date: baseDate })
                                .orderBy('campaigns.updatedAt', 'DESC')
                                .paginate()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    CampaignRepository.prototype.getStatusActiveList = function (clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var baseDate;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        baseDate = moment_1.default(Date.now()).toISOString();
                        return [4, this.repository
                                .createQueryBuilder()
                                .where('client_id = :client_id', { client_id: clientId })
                                .andWhere('(end_date >= :base_date)', { base_date: baseDate })
                                .orderBy('updated_at', 'DESC')
                                .getMany()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    CampaignRepository.prototype.getOne = function (id) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var data, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.findOne(id, { relations: ['campaignStores', 'campaignProducts', 'category'] })];
                    case 1:
                        data = _a.sent();
                        if (!data) {
                            return [2, null];
                        }
                        result = tslib_1.__assign(tslib_1.__assign({}, data), { startDate: data.startDate ? moment_1.default(data.startDate).format('YYYY-MM-DDTHH:mm') : '', endDate: data.endDate ? moment_1.default(data.endDate).format('YYYY-MM-DDTHH:mm') : '', storeIds: data.campaignStores ? data.campaignStores.map(function (item) { return item.storeId; }) : [], productIds: data.campaignProducts ? data.campaignProducts.map(function (item) { return item.productId; }) : [] });
                        return [2, result];
                }
            });
        });
    };
    CampaignRepository.prototype.updateStatus = function (body) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var record;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        record = new Campaigns_1.Campaigns();
                        record.id = body.id;
                        record.status = body.status;
                        return [4, this.repository.save(record)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return CampaignRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.CampaignRepository = CampaignRepository;
//# sourceMappingURL=Campaign.repository.js.map