"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleAreaRepository = void 0;
var tslib_1 = require("tslib");
var SaleAreas_1 = require("../models/entities/SaleAreas");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var SaleAreaRepository = (function (_super) {
    tslib_1.__extends(SaleAreaRepository, _super);
    function SaleAreaRepository() {
        return _super.call(this, SaleAreas_1.SaleAreas) || this;
    }
    return SaleAreaRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.SaleAreaRepository = SaleAreaRepository;
//# sourceMappingURL=SaleAreas.repository.js.map