"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenarioTreesRepository = void 0;
var tslib_1 = require("tslib");
var ScenarioTrees_1 = require("../models/entities/ScenarioTrees");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var typeorm_1 = require("typeorm");
var ScenarioTreesRepository = (function (_super) {
    tslib_1.__extends(ScenarioTreesRepository, _super);
    function ScenarioTreesRepository() {
        return _super.call(this, ScenarioTrees_1.ScenarioTrees) || this;
    }
    ScenarioTreesRepository.prototype.deleteTreeNode = function (st) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var manager, trees, _i, trees_1, tree;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        manager = typeorm_1.getManager();
                        return [4, manager.getTreeRepository(ScenarioTrees_1.ScenarioTrees).findDescendants(st)];
                    case 1:
                        trees = _a.sent();
                        _i = 0, trees_1 = trees;
                        _a.label = 2;
                    case 2:
                        if (!(_i < trees_1.length)) return [3, 5];
                        tree = trees_1[_i];
                        return [4, this.repository.delete(tree)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3, 2];
                    case 5: return [2];
                }
            });
        });
    };
    return ScenarioTreesRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.ScenarioTreesRepository = ScenarioTreesRepository;
//# sourceMappingURL=ScenarioTrees.repository.js.map