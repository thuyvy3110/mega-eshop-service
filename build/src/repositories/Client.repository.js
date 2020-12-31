"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientRepository = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Clients_1 = require("../models/entities/Clients");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var ClientRepository = (function (_super) {
    tslib_1.__extends(ClientRepository, _super);
    function ClientRepository() {
        return _super.call(this, Clients_1.Clients) || this;
    }
    ClientRepository.prototype.getClientByType = function (clientType) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, typeorm_1.getRepository(Clients_1.Clients)
                            .createQueryBuilder()
                            .where('type = :clientType', { clientType: clientType })
                            .getOne()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return ClientRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.ClientRepository = ClientRepository;
//# sourceMappingURL=Client.repository.js.map