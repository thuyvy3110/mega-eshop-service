"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var Base_controller_1 = require("./Base.controller");
var Logs_repository_1 = require("../repositories/Logs.repository");
var VideoCalling_repository_1 = require("../repositories/VideoCalling.repository");
var VideoCalling_1 = require("../models/entities/VideoCalling");
var Logs_1 = require("../models/entities/Logs");
var CampaignStore_repository_1 = require("../repositories/CampaignStore.repository");
var LogController = (function (_super) {
    tslib_1.__extends(LogController, _super);
    function LogController() {
        var _this = _super.call(this, Logs_1.Logs, '/vs/logs') || this;
        _this.videoCallingRepository = new VideoCalling_repository_1.VideoCallingRepository();
        _this.campaignStoreRepostiroy = new CampaignStore_repository_1.CampaignStoreRepository();
        return _this;
    }
    LogController.prototype.initRepository = function () {
        return new Logs_repository_1.LogsRepository();
    };
    LogController.prototype.customRoutes = function () {
        var _this = this;
        this.router.post(this.path + '/init', function (req, res) { return _this.initCustomer(req, res); });
        this.router.post(this.path + '/video_calling', function (req, res) { return _this.logVideoCalling(req, res); });
    };
    LogController.prototype.initCustomer = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var accountName, lastCustomerId, log, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4, this.findUsernameInRequest(request)];
                    case 1:
                        accountName = _a.sent();
                        return [4, this.repository.getLastCustomerId()];
                    case 2:
                        lastCustomerId = _a.sent();
                        log = new Logs_1.Logs();
                        log.createdBy = accountName;
                        log.updatedBy = accountName;
                        log.customerId = lastCustomerId + 1;
                        log.storeId = request.body.storeId;
                        return [4, this.repository.insert(log)];
                    case 3:
                        _a.sent();
                        return [2, response.status(200).json({ "customerId": log.customerId })];
                    case 4:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 5: return [2];
                }
            });
        });
    };
    LogController.prototype.create = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var accountName, log, result, logId, entity, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        console.log('log recorded', request.body);
                        return [4, this.findUsernameInRequest(request)];
                    case 1:
                        accountName = _a.sent();
                        log = new Logs_1.Logs();
                        log.storeId = request.body.storeId;
                        log.customerId = request.body.customerId;
                        log.tappedNodeId = request.body.nodeId;
                        log.createdBy = accountName;
                        log.updatedBy = accountName;
                        return [4, this.repository.insert(log)];
                    case 2:
                        result = _a.sent();
                        logId = result.generatedMaps[0].id;
                        return [4, this.repository.findOneById(logId)];
                    case 3:
                        entity = _a.sent();
                        return [2, response.status(200).json(entity)];
                    case 4:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 5: return [2];
                }
            });
        });
    };
    LogController.prototype.logVideoCalling = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var result, logId, accountName, account, log, record, campaignId, storeId, campaignStore, record, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logId = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 12, , 13]);
                        return [4, this.findUsernameInRequest(request)];
                    case 2:
                        accountName = _a.sent();
                        return [4, this.findTabletByAccount(accountName)];
                    case 3:
                        account = _a.sent();
                        if (!account) {
                            console.log('submitting log video call not found account ', accountName);
                            return [2, response.status(404).json({ message: 'Account is not found' })];
                        }
                        return [4, this.repository.findOneById(request.body.logId)];
                    case 4:
                        log = _a.sent();
                        if (!log) {
                            console.log('submitting log not found', request.body);
                            return [2, response.status(404).json({ message: 'Log is not found' })];
                        }
                        if (!(request.body.value === 'start')) return [3, 8];
                        record = new VideoCalling_1.VideoCalling();
                        record.accountId = account.id;
                        campaignId = request.body.campaignId;
                        storeId = request.body.storeId;
                        return [4, this.campaignStoreRepostiroy.find({
                                where: {
                                    campaignId: campaignId,
                                    storeId: storeId
                                }
                            })];
                    case 5:
                        campaignStore = _a.sent();
                        if (!campaignStore) {
                            return [2, response.status(404).json({ message: 'Campaign Store is not found' })];
                        }
                        record.campaignStoreId = campaignStore[0].id;
                        record.salespersonId = request.body.salePersonId;
                        record.startedAt = new Date();
                        record.createdBy = account.account;
                        record.updatedBy = account.account;
                        return [4, this.videoCallingRepository.insert(record)];
                    case 6:
                        result = _a.sent();
                        log.videoCallingId = result.generatedMaps[0].id;
                        return [4, this.repository.update(log.id, log)];
                    case 7:
                        _a.sent();
                        return [3, 11];
                    case 8: return [4, this.videoCallingRepository.findOneById(log.videoCallingId)];
                    case 9:
                        record = _a.sent();
                        if (!record) {
                            return [2, response.status(404).json({ message: 'Previous VideoCalling log is not found' })];
                        }
                        record.updatedBy = account.account;
                        record.stoppedAt = new Date();
                        return [4, this.videoCallingRepository.update(record.id, record)];
                    case 10:
                        result = _a.sent();
                        logId = record.id;
                        _a.label = 11;
                    case 11: return [2, response.status(200).json('OK')];
                    case 12:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 13: return [2];
                }
            });
        });
    };
    LogController.prototype.find = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, response.status(500).json({ message: 'Not supported' })];
            });
        });
    };
    LogController.prototype.findOne = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, response.status(500).json({ message: 'Not supported' })];
            });
        });
    };
    LogController.prototype.paginate = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, response.status(500).json({ message: 'Not supported' })];
            });
        });
    };
    LogController.prototype.delete = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, response.status(500).json({ message: 'Not supported' })];
            });
        });
    };
    LogController.prototype.update = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, response.status(500).json({ message: 'Not supported' })];
            });
        });
    };
    return LogController;
}(Base_controller_1.BaseController));
exports.default = LogController;
//# sourceMappingURL=Log.controller.js.map