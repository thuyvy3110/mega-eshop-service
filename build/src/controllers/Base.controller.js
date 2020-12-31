"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
var tslib_1 = require("tslib");
var express_1 = require("express");
var jwt_decode_1 = tslib_1.__importDefault(require("jwt-decode"));
var lodash_1 = tslib_1.__importDefault(require("lodash"));
var typeorm_1 = require("typeorm");
var errCode_1 = require("../lib/errCode");
var BaseAccount_repository_1 = require("../repositories/BaseAccount.repository");
var Storage_utils_1 = require("../utils/Storage.utils");
var BaseController = (function () {
    function BaseController(entity, path) {
        this.router = express_1.Router();
        this.errCode = errCode_1.ErrCode;
        this.path = path;
        this.repository = this.initRepository();
        this.customRoutes();
        this.initRoutes();
        this.entity = entity;
        this.accountRepository = new BaseAccount_repository_1.BaseAccountRepository();
    }
    BaseController.prototype.initRoutes = function () {
        var _this = this;
        this.router.post(this.path, function (req, res) { return _this.create(req, res); });
        this.router.get(this.path, function (req, res) { return _this.find(req, res); });
        this.router.get(this.path + '/all', function (req, res) { return _this.find(req, res); });
        this.router.get(this.path + '/:id(\\d+)', function (req, res) { return _this.findOne(req, res); });
        this.router.get(this.path + '/list', function (req, res) { return _this.paginate(req, res); });
        this.router.delete(this.path + '/:id', function (req, res) { return _this.delete(req, res); });
        this.router.put(this.path + '/:id(\\d+)', function (req, res) { return _this.update(req, res); });
    };
    BaseController.prototype.updateRepository = function (repository) {
        this.repository = repository;
    };
    BaseController.prototype.find = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var record, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('BaseController - find: ' + request);
                        return [4, this.repository.find()];
                    case 1:
                        record = _a.sent();
                        return [2, response.status(200).json(record)];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 3: return [2];
                }
            });
        });
    };
    BaseController.prototype.findOne = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var record, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('BaseController - findOne: ' + request);
                        console.log('FindOne params: ', request.params.id);
                        return [4, this.repository.findOneById(request.params.id)];
                    case 1:
                        record = _a.sent();
                        if (lodash_1.default.isEmpty(record)) {
                            return [2, response.status(404).json({ message: 'No Data' })];
                        }
                        return [2, response.status(200).json(record)];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 3: return [2];
                }
            });
        });
    };
    BaseController.prototype.findAll = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var record, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.repository.findAll()];
                    case 1:
                        record = _a.sent();
                        return [2, response.status(200).json(record)];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 3: return [2];
                }
            });
        });
    };
    BaseController.prototype.delete = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('BaseController - delete: ' + request);
                        return [4, this.repository.delete(request.params.id)];
                    case 1:
                        _a.sent();
                        return [2, response.status(200).json({ message: 'Record deleted' })];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 3: return [2];
                }
            });
        });
    };
    BaseController.prototype.update = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('BaseController - update: ' + request);
                        return [4, this.repository.update(request.params.toString(), request.body)];
                    case 1:
                        _a.sent();
                        return [2, response.status(200).json({ message: 'Record updated' })];
                    case 2:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 3: return [2];
                }
            });
        });
    };
    BaseController.prototype.create = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('BaseController - create: ' + request);
                        return [4, this.repository.insert(request.body)];
                    case 1:
                        _a.sent();
                        return [2, response.status(201).json({ message: 'Record Inserted' })];
                    case 2:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 3: return [2];
                }
            });
        });
    };
    BaseController.prototype.paginate = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var entities, error_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (lodash_1.default.isEmpty(request.query)) {
                            return [2, response.status(400).json({ message: 'Bad Request' })];
                        }
                        console.log('Paginate params: ', request.query);
                        return [4, typeorm_1.getRepository(this.entity).createQueryBuilder().paginate()];
                    case 1:
                        entities = _a.sent();
                        return [2, response.status(200).json(entities)];
                    case 2:
                        error_7 = _a.sent();
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 3: return [2];
                }
            });
        });
    };
    BaseController.prototype.parseJwtToken = function (request) {
        var _a;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var token;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, ((_a = request.get('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', ''))];
                    case 1:
                        token = _b.sent();
                        return [2, jwt_decode_1.default(token)];
                }
            });
        });
    };
    BaseController.prototype.findUsernameInRequest = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var execData, name;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.parseJwtToken(request)];
                    case 1:
                        execData = _a.sent();
                        name = execData.username;
                        return [2, name];
                }
            });
        });
    };
    BaseController.prototype.findUserPoolName = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var poolName;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, request.get('poolname')];
                    case 1:
                        poolName = _a.sent();
                        return [2, poolName];
                }
            });
        });
    };
    BaseController.prototype.findClientId = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var account, poolName, id;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findUsernameInRequest(request)];
                    case 1:
                        account = _a.sent();
                        return [4, this.findUserPoolName(request)];
                    case 2:
                        poolName = _a.sent();
                        return [4, this.accountRepository.getClientId(account, poolName)];
                    case 3:
                        id = _a.sent();
                        return [2, id];
                }
            });
        });
    };
    BaseController.prototype.findParentClientIdFirst = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var client;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findClientObject(request)];
                    case 1:
                        client = _a.sent();
                        return [2, client.parentClientId === 0 ? client.id : client.parentClientId];
                }
            });
        });
    };
    BaseController.prototype.findClientObject = function (request) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var account, poolName;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findUsernameInRequest(request)];
                    case 1:
                        account = _a.sent();
                        return [4, this.findUserPoolName(request)];
                    case 2:
                        poolName = _a.sent();
                        return [2, this.accountRepository.getClientObject(account, poolName)];
                }
            });
        });
    };
    BaseController.prototype.findSalePersonByAccount = function (account) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.accountRepository.getAccountSalesPerson(account)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    BaseController.prototype.findTabletByAccount = function (account) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.accountRepository.getAccountTablet(account)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    BaseController.prototype.upload = function (request, fieldName, fileKey) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var file, name, result, error_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!request.files[fieldName]) {
                            throw new Error('file not found');
                        }
                        file = request.files[fieldName];
                        name = file.name;
                        console.log(file.tempFilePath);
                        fileKey += name.substring(name.lastIndexOf('.'));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, Storage_utils_1.uploadFileToS3(file.tempFilePath, fileKey)];
                    case 2:
                        result = _a.sent();
                        return [2, result.Key];
                    case 3:
                        error_8 = _a.sent();
                        console.log(error_8);
                        throw error_8;
                    case 4: return [2];
                }
            });
        });
    };
    BaseController.prototype.assignProperty = function (record, field, val) {
        record[field] = val;
    };
    return BaseController;
}());
exports.BaseController = BaseController;
//# sourceMappingURL=Base.controller.js.map