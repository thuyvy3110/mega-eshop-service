"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenarioTrees = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var Scenarios_1 = require("./Scenarios");
var ScenarioTrees = (function (_super) {
    tslib_1.__extends(ScenarioTrees, _super);
    function ScenarioTrees() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScenarioTrees.prototype.toJSON = function () {
        this.nodeId = this.id;
        return this;
    };
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], ScenarioTrees.prototype, "scenarioId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], ScenarioTrees.prototype, "scenarioType", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], ScenarioTrees.prototype, "dispValue", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], ScenarioTrees.prototype, "value", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], ScenarioTrees.prototype, "scenarioReference", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], ScenarioTrees.prototype, "scenarioReferenceId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], ScenarioTrees.prototype, "parentId", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Scenarios_1.Scenarios; }, function (scenarios) { return scenarios.scenarioTrees; }, {
            onDelete: 'CASCADE',
            onUpdate: 'NO ACTION',
        }),
        typeorm_1.JoinColumn([{ name: 'scenario_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Scenarios_1.Scenarios)
    ], ScenarioTrees.prototype, "scenario", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ select: false, insert: false, update: false }),
        tslib_1.__metadata("design:type", Number)
    ], ScenarioTrees.prototype, "nodeId", void 0);
    tslib_1.__decorate([
        typeorm_1.TreeChildren(),
        tslib_1.__metadata("design:type", Array)
    ], ScenarioTrees.prototype, "children", void 0);
    tslib_1.__decorate([
        typeorm_1.TreeParent(),
        tslib_1.__metadata("design:type", ScenarioTrees)
    ], ScenarioTrees.prototype, "parent", void 0);
    ScenarioTrees = tslib_1.__decorate([
        typeorm_1.Index('scenario_trees_UNIQUE', ['scenarioId', 'scenarioType', 'dispValue', 'parentId'], { unique: true }),
        typeorm_1.Entity('scenario_trees'),
        typeorm_1.Tree("materialized-path")
    ], ScenarioTrees);
    return ScenarioTrees;
}(Base_models_1.BaseModel));
exports.ScenarioTrees = ScenarioTrees;
//# sourceMappingURL=ScenarioTrees.js.map