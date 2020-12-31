"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreRepository = void 0;
var tslib_1 = require("tslib");
var Stores_1 = require("../models/entities/Stores");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var StoreRepository = (function (_super) {
    tslib_1.__extends(StoreRepository, _super);
    function StoreRepository() {
        return _super.call(this, Stores_1.Stores) || this;
    }
    return StoreRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.StoreRepository = StoreRepository;
//# sourceMappingURL=Stores.repository.js.map