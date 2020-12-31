"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenarioInitialMovies = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Base_models_1 = require("../Base.models");
var Scenarios_1 = require("./Scenarios");
var ScenarioInitialMovies = (function (_super) {
    tslib_1.__extends(ScenarioInitialMovies, _super);
    function ScenarioInitialMovies() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScenarioInitialMovies.prototype.toJSON = function () {
        this.parentId = "-1";
        this.nodeId = "0";
        this.scenarioType = 'TOPNODE';
        return this;
    };
    tslib_1.__decorate([
        typeorm_1.Column({ name: 'movie_1st', length: 500 }),
        tslib_1.__metadata("design:type", String)
    ], ScenarioInitialMovies.prototype, "movie_1st", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ name: 'movie_2nd', length: 500 }),
        tslib_1.__metadata("design:type", String)
    ], ScenarioInitialMovies.prototype, "movie_2nd", void 0);
    tslib_1.__decorate([
        typeorm_1.Column('int', { name: 'percentage' }),
        tslib_1.__metadata("design:type", Number)
    ], ScenarioInitialMovies.prototype, "percentage", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ name: 'movie_1st_count' }),
        tslib_1.__metadata("design:type", Number)
    ], ScenarioInitialMovies.prototype, "movie_1stCount", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ name: 'movie_2nd_count' }),
        tslib_1.__metadata("design:type", Number)
    ], ScenarioInitialMovies.prototype, "movie_2ndCount", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToOne(function () { return Scenarios_1.Scenarios; }, function (scenarios) { return scenarios.scenarioInitialMovies; }, {
            onDelete: 'CASCADE',
        }),
        typeorm_1.JoinColumn({ name: 'scenario_id' }),
        tslib_1.__metadata("design:type", Scenarios_1.Scenarios)
    ], ScenarioInitialMovies.prototype, "scenario", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ length: 100 }),
        tslib_1.__metadata("design:type", String)
    ], ScenarioInitialMovies.prototype, "dispValue", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ select: false, insert: false, update: false }),
        tslib_1.__metadata("design:type", String)
    ], ScenarioInitialMovies.prototype, "parentId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ select: false, insert: false, update: false }),
        tslib_1.__metadata("design:type", String)
    ], ScenarioInitialMovies.prototype, "nodeId", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ select: false, insert: false, update: false }),
        tslib_1.__metadata("design:type", String)
    ], ScenarioInitialMovies.prototype, "scenarioType", void 0);
    tslib_1.__decorate([
        typeorm_1.Column(),
        tslib_1.__metadata("design:type", Number)
    ], ScenarioInitialMovies.prototype, "scenarioId", void 0);
    ScenarioInitialMovies = tslib_1.__decorate([
        typeorm_1.Entity('scenario_initial_movies')
    ], ScenarioInitialMovies);
    return ScenarioInitialMovies;
}(Base_models_1.BaseModel));
exports.ScenarioInitialMovies = ScenarioInitialMovies;
//# sourceMappingURL=ScenarioInitialMovies.js.map