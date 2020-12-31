"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scenarios = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var Clients_1 = require("./Clients");
var ScenarioInitialMovies_1 = require("./ScenarioInitialMovies");
var ScenarioTrees_1 = require("./ScenarioTrees");
var Scenarios = (function (_super) {
    tslib_1.__extends(Scenarios, _super);
    function Scenarios() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    tslib_1.__decorate([
        typeorm_1.Column({ length: 200 }),
        tslib_1.__metadata("design:type", String)
    ], Scenarios.prototype, "scenarioName", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Scenarios.prototype, "clientId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Scenarios.prototype, "categoryId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], Scenarios.prototype, "campaignId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", String)
    ], Scenarios.prototype, "content", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return ScenarioInitialMovies_1.ScenarioInitialMovies; }, function (scenarioInitialMovies) { return scenarioInitialMovies.scenario; }, { cascade: ['insert'] }),
        tslib_1.__metadata("design:type", ScenarioInitialMovies_1.ScenarioInitialMovies)
    ], Scenarios.prototype, "scenarioInitialMovies", void 0);
    tslib_1.__decorate([
        typeorm_1.OneToMany(function () { return ScenarioTrees_1.ScenarioTrees; }, function (scenarioTrees) { return scenarioTrees.scenario; }),
        tslib_1.__metadata("design:type", Array)
    ], Scenarios.prototype, "scenarioTrees", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Clients_1.Clients; }, function (clients) { return clients.scenarios; }, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }),
        typeorm_1.JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }]),
        tslib_1.__metadata("design:type", Clients_1.Clients)
    ], Scenarios.prototype, "client", void 0);
    Scenarios = tslib_1.__decorate([
        typeorm_1.Index('scenarios_UNIQUE', ['scenarioName', 'clientId'], { unique: true }),
        typeorm_1.Index('fk_scenarios_clients1_idx', ['clientId'], {}),
        typeorm_1.Entity('scenarios')
    ], Scenarios);
    return Scenarios;
}(Base_models_1.BaseModel));
exports.Scenarios = Scenarios;
//# sourceMappingURL=Scenarios.js.map