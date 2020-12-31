"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreRepository = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var CampaignStores_1 = require("../models/entities/CampaignStores");
var Stores_1 = require("../models/entities/Stores");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var Campaigns_1 = require("../models/entities/Campaigns");
var Campaign_repository_1 = require("./Campaign.repository");
var Scenarios_1 = require("../models/entities/Scenarios");
var StoreRepository = (function (_super) {
    tslib_1.__extends(StoreRepository, _super);
    function StoreRepository() {
        var _this = _super.call(this, Stores_1.Stores) || this;
        _this.campaignRepository = new Campaign_repository_1.CampaignRepository();
        return _this;
    }
    StoreRepository.prototype.getAll = function (clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.repository
                        .createQueryBuilder('stores')
                        .where('stores.client_id = :client_id')
                        .setParameter('client_id', clientId)
                        .getMany()];
            });
        });
    };
    StoreRepository.prototype.getById = function (clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var qb;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.createQueryBuilder()];
                    case 1:
                        qb = _a.sent();
                        return [2, this.repository
                                .createQueryBuilder('stores')
                                .where("stores.client_id = :client_id AND stores.id NOT IN " + qb.subQuery()
                                .select('store_id')
                                .distinct(true)
                                .from(CampaignStores_1.CampaignStores, 'campaign_store')
                                .getQuery())
                                .setParameter('client_id', clientId)
                                .getMany()];
                }
            });
        });
    };
    StoreRepository.prototype.getStoreIdByCampaignStore = function (clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storeId, campaignId, campaignList, i, id, data;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        storeId = [];
                        campaignId = [];
                        return [4, this.campaignRepository.getStatusActiveList(clientId)];
                    case 1:
                        campaignList = _a.sent();
                        if (!campaignList) {
                            return [2, []];
                        }
                        for (i = 0; i < campaignList.length; ++i) {
                            id = campaignList[i].id;
                            campaignId.push(id);
                        }
                        return [4, typeorm_1.getRepository(CampaignStores_1.CampaignStores).createQueryBuilder('campaign_stores')
                                .innerJoinAndSelect(Campaigns_1.Campaigns, 'campaigns', 'campaigns.id = campaign_stores.campaign_id')
                                .where("campaign_stores.campaign_id IN (" + campaignId + " )")
                                .select('campaign_stores.storeId')
                                .getMany()];
                    case 2:
                        data = _a.sent();
                        data.forEach(function (element) { return storeId.push(element.storeId); });
                        return [2, storeId];
                }
            });
        });
    };
    StoreRepository.prototype.findScenarioFromStore = function (storeId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var campaignId, id, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, typeorm_1.getRepository(Campaigns_1.Campaigns).createQueryBuilder('campaigns')
                                .innerJoinAndSelect(CampaignStores_1.CampaignStores, 'campaign_stores', 'campaigns.id = campaign_stores.campaign_id')
                                .where("campaign_stores.store_id = " + storeId)
                                .select('campaigns.id')
                                .getOne()];
                    case 1:
                        campaignId = _a.sent();
                        if (!campaignId) {
                            return [2, null];
                        }
                        id = campaignId.id;
                        return [4, typeorm_1.getRepository(Scenarios_1.Scenarios).createQueryBuilder('scenarios')
                                .where("scenarios.campaign_id = " + id)
                                .getOne()];
                    case 2: return [2, _a.sent()];
                    case 3:
                        err_1 = _a.sent();
                        console.log(err_1);
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    StoreRepository.prototype.findActiveStore = function (clientId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var storeIdInCampaignStore, err_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.getStoreIdByCampaignStore(clientId)];
                    case 1:
                        storeIdInCampaignStore = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        if (storeIdInCampaignStore.length == 0) {
                            return [2, []];
                        }
                        return [4, typeorm_1.getRepository(Stores_1.Stores)
                                .createQueryBuilder("stores")
                                .where("stores.id IN (" + storeIdInCampaignStore + ")")
                                .getMany()];
                    case 3: return [2, _a.sent()];
                    case 4:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    StoreRepository.prototype.deleteByStoreId = function (storeId) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.createQueryBuilder()
                            .delete()
                            .from(Stores_1.Stores)
                            .where("id IN (" + storeId + ")")
                            .execute()];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    return StoreRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.StoreRepository = StoreRepository;
//# sourceMappingURL=Store.repository.js.map