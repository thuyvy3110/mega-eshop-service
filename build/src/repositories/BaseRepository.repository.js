"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var BaseRepository = (function () {
    function BaseRepository(entity) {
        this.repository = typeorm_1.getRepository(entity);
    }
    BaseRepository.prototype.findAll = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.repository.find()];
            });
        });
    };
    BaseRepository.prototype.find = function (options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.repository.find(options)];
            });
        });
    };
    BaseRepository.prototype.findWithCondition = function (conditions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.repository.find(conditions)];
            });
        });
    };
    BaseRepository.prototype.findOneById = function (id, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.repository.findOne(id, options)];
            });
        });
    };
    BaseRepository.prototype.findByIds = function (ids) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.repository.findByIds(ids)];
            });
        });
    };
    BaseRepository.prototype.delete = function (criteria) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.repository.delete(criteria)];
            });
        });
    };
    BaseRepository.prototype.deleteCascade = function (entity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.repository.remove(entity)];
            });
        });
    };
    BaseRepository.prototype.update = function (criteria, partialEntity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.update(criteria, partialEntity)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    BaseRepository.prototype.insert = function (entity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.repository.insert(entity)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    BaseRepository.prototype.upsert = function (entity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.repository.save(entity)];
            });
        });
    };
    BaseRepository.prototype.upserts = function (entities) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2, this.repository.save(entities)];
            });
        });
    };
    return BaseRepository;
}());
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=BaseRepository.repository.js.map