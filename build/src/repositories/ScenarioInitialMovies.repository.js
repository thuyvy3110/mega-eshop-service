"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScenarioInitialMoviesRepository = void 0;
var tslib_1 = require("tslib");
var ScenarioInitialMovies_1 = require("../models/entities/ScenarioInitialMovies");
var BaseRepository_repository_1 = require("./BaseRepository.repository");
var ScenarioInitialMoviesRepository = (function (_super) {
    tslib_1.__extends(ScenarioInitialMoviesRepository, _super);
    function ScenarioInitialMoviesRepository() {
        return _super.call(this, ScenarioInitialMovies_1.ScenarioInitialMovies) || this;
    }
    return ScenarioInitialMoviesRepository;
}(BaseRepository_repository_1.BaseRepository));
exports.ScenarioInitialMoviesRepository = ScenarioInitialMoviesRepository;
//# sourceMappingURL=ScenarioInitialMovies.repository.js.map