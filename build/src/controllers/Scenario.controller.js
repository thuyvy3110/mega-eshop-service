"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var lodash_1 = tslib_1.__importDefault(require("lodash"));
var typeorm_1 = require("typeorm");
var Scenarios_1 = require("../models/entities/Scenarios");
var Campaign_repository_1 = require("../repositories/Campaign.repository");
var Categories_repository_1 = require("../repositories/Categories.repository");
var Scenario_repository_1 = require("../repositories/Scenario.repository");
var Base_controller_1 = require("./Base.controller");
var ScenarioTrees_repository_1 = require("../repositories/ScenarioTrees.repository");
var ScenarioTrees_1 = require("../models/entities/ScenarioTrees");
var ScenarioInitialMovies_1 = require("../models/entities/ScenarioInitialMovies");
var ScenarioInitialMovies_repository_1 = require("../repositories/ScenarioInitialMovies.repository");
var ScenarioController = (function (_super) {
    tslib_1.__extends(ScenarioController, _super);
    function ScenarioController() {
        var _this = _super.call(this, Scenarios_1.Scenarios, '/vs/scenario') || this;
        _this.getAllCategories = function (request, response) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var clientId, campaigns, categories, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findClientId(request)];
                    case 1:
                        clientId = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4, this.campaignRepository.getStatusActiveList(clientId)];
                    case 3:
                        campaigns = _a.sent();
                        return [4, this.categoriesRepository.getTypeScenario(clientId)];
                    case 4:
                        categories = _a.sent();
                        return [2, response.status(200).json({ campaigns: campaigns, categories: categories })];
                    case 5:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 6: return [2];
                }
            });
        }); };
        _this.categoriesRepository = new Categories_repository_1.CategoriesRepository();
        _this.campaignRepository = new Campaign_repository_1.CampaignRepository();
        _this.scenarioTreesRepository = new ScenarioTrees_repository_1.ScenarioTreesRepository();
        _this.scenarioInitialMovieRepository = new ScenarioInitialMovies_repository_1.ScenarioInitialMoviesRepository();
        return _this;
    }
    ScenarioController.prototype.initRepository = function () {
        return new Scenario_repository_1.ScenarioRepository();
    };
    ScenarioController.prototype.customRoutes = function () {
        var _this = this;
        this.router.get(this.path + '/categories', function (req, res) { return _this.getAllCategories(req, res); });
        this.router.get(this.path + '/:clientId/list', function (req, res) { return _this.getAll(req, res); });
        this.router.post(this.path + '/:id(\\d+)/tree', function (req, res) { return _this.updateTreeNode(req, res); });
        this.router.post(this.path + '/:id(\\d+)/initial', function (req, res) { return _this.updateInitialMovie(req, res); });
        this.router.delete(this.path + '/:id(\\d+)/tree/:nodeId(\\d+)', function (req, res) { return _this.deleteTreeNode(req, res); });
    };
    ScenarioController.prototype.getAll = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var clientId, entities, parsedEntities, i, entity, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findClientId(request)];
                    case 1:
                        clientId = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 8, , 9]);
                        if (lodash_1.default.isEmpty(request.query)) {
                            return [2, response.status(400).json({ message: 'Bad Request' })];
                        }
                        return [4, typeorm_1.getRepository(this.entity).createQueryBuilder()
                                .where('client_id = :client_id', { client_id: clientId })
                                .orderBy('id', 'DESC')
                                .paginate()];
                    case 3:
                        entities = _a.sent();
                        parsedEntities = [];
                        if (!entities) return [3, 7];
                        i = 0;
                        _a.label = 4;
                    case 4:
                        if (!(i < entities.data.length)) return [3, 7];
                        return [4, this.resolveCampaignCategory(entities.data[i])];
                    case 5:
                        entity = _a.sent();
                        parsedEntities.push(entity);
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3, 4];
                    case 7:
                        entities.data = parsedEntities;
                        return [2, response.status(200).json(entities)];
                    case 8:
                        error_2 = _a.sent();
                        console.log(error_2);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 9: return [2, _super.prototype.paginate.call(this, request, response)];
                }
            });
        });
    };
    ScenarioController.prototype.resolveCampaignCategory = function (entity) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var campaign, category, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4, this.campaignRepository.findOneById(entity.campaignId)];
                    case 1:
                        campaign = _a.sent();
                        return [4, this.categoriesRepository.findOneById(entity.categoryId)];
                    case 2:
                        category = _a.sent();
                        if (campaign) {
                            entity.campaignName = campaign.campaignName;
                        }
                        if (category) {
                            entity.categoryName = category.campaignCategoryName;
                        }
                        return [2, entity];
                    case 3:
                        error_3 = _a.sent();
                        throw error_3;
                    case 4: return [2];
                }
            });
        });
    };
    ScenarioController.prototype.findOne = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var record, trees, initialNode, error_4;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4, this.repository.findOneById(request.params.id)];
                    case 1:
                        record = _a.sent();
                        if (!record) {
                            return [2, response.status(404).json({ message: 'No Data' })];
                        }
                        return [4, this.scenarioTreesRepository.find({
                                where: {
                                    'scenarioId': request.params.id
                                }
                            })];
                    case 2:
                        trees = _a.sent();
                        trees.forEach(function (tree) {
                            tree.nodeId = tree.id;
                        });
                        record.scenarioTrees = trees;
                        return [4, this.scenarioInitialMovieRepository
                                .repository
                                .createQueryBuilder()
                                .where('scenario_id = :sc', { sc: request.params.id })
                                .getOne()];
                    case 3:
                        initialNode = _a.sent();
                        if (initialNode) {
                            record.scenarioInitialMovies = initialNode;
                            record.scenarioInitialMovies.scenarioId = record.id;
                        }
                        return [2, response.status(200).json(record)];
                    case 4:
                        error_4 = _a.sent();
                        console.log(error_4);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 5: return [2];
                }
            });
        });
    };
    ScenarioController.prototype.create = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var account, scenarioRecord, result, node, error_5;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findUsernameInRequest(request)];
                    case 1:
                        account = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        scenarioRecord = new Scenarios_1.Scenarios();
                        scenarioRecord.scenarioName = request.body.scenario_name;
                        scenarioRecord.campaignId = request.body.campaign_id;
                        scenarioRecord.clientId = request.body.client_id;
                        scenarioRecord.categoryId = request.body.category_id;
                        scenarioRecord.content = request.body.content;
                        scenarioRecord.updatedBy = account;
                        scenarioRecord.createdBy = account;
                        return [4, this.repository.upsert(scenarioRecord)];
                    case 3:
                        result = _a.sent();
                        node = new ScenarioInitialMovies_1.ScenarioInitialMovies();
                        node.dispValue = 'Top Node';
                        node.scenarioId = result.id;
                        node.scenario = result;
                        node.createdBy = account;
                        node.updatedBy = account;
                        node.movie_1st = '';
                        node.movie_2nd = '';
                        node.movie_1stCount = 0;
                        node.movie_2ndCount = 0;
                        node.percentage = 0;
                        return [4, this.scenarioInitialMovieRepository.insert(node)];
                    case 4:
                        _a.sent();
                        return [2, response.status(200).json({
                                message: 'Record Inserted',
                                data: result.id
                            })];
                    case 5:
                        error_5 = _a.sent();
                        console.log(error_5);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 6: return [2];
                }
            });
        });
    };
    ScenarioController.prototype.update = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var account, record, error_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.findUsernameInRequest(request)];
                    case 1:
                        account = _a.sent();
                        return [4, this.repository.findOneById(request.params.id)];
                    case 2:
                        record = _a.sent();
                        if (!record) {
                            return [2, response.status(404).json({ message: 'No Data' })];
                        }
                        record.scenarioName = request.body.scenario_name;
                        record.content = request.body.content;
                        record.categoryId = request.body.category_id;
                        record.campaignId = request.body.campaign_id;
                        record.updatedBy = account;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4, this.repository.update(request.params.id, record)];
                    case 4:
                        _a.sent();
                        return [2, response.status(200).json({ message: 'Record Updated' })];
                    case 5:
                        error_6 = _a.sent();
                        console.log(error_6);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 6: return [2];
                }
            });
        });
    };
    ScenarioController.prototype.updateTreeNode = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var account, scenario, isNew, node, nodeId, parentNode, r, uploadResult, error_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 13, , 14]);
                        return [4, this.findUsernameInRequest(req)];
                    case 1:
                        account = _a.sent();
                        return [4, this.repository.findOneById(req.params.id)];
                    case 2:
                        scenario = _a.sent();
                        if (lodash_1.default.isEmpty(scenario)) {
                            return [2, res.status(404).json({ message: 'Bad Request' })];
                        }
                        isNew = req.body.nodeId !== "0" ? false : true;
                        node = void 0;
                        if (!isNew) return [3, 3];
                        node = new ScenarioTrees_1.ScenarioTrees();
                        node.createdBy = account;
                        node.scenarioId = +req.params.id;
                        return [3, 5];
                    case 3: return [4, this.scenarioTreesRepository.findOneById(req.body.nodeId)];
                    case 4:
                        node = _a.sent();
                        if (!node) {
                            return [2, res.status(404).json({ message: 'Bad Request' })];
                        }
                        _a.label = 5;
                    case 5:
                        node.scenarioType = req.body.scenarioType;
                        node.parentId = +req.body.parentId;
                        if (node.parentId == -1) {
                            node.parentId = 0;
                        }
                        node.dispValue = req.body.dispValue;
                        if (req.body.value) {
                            node.value = req.body.value;
                        }
                        else {
                            node.value = '';
                        }
                        if (node.scenarioType === 'CALL') {
                            node.value = node.dispValue;
                        }
                        else if (node.scenarioType == 'TABLET_QR' || node.scenarioType == 'DISPLAY_QR') {
                            node.value = node.dispValue;
                            node.scenarioReference = req.body.scenarioReference;
                            node.scenarioReferenceId = req.body.scenarioReferenceId;
                        }
                        node.updatedBy = account;
                        nodeId = void 0;
                        if (!isNew) return [3, 9];
                        if (!(req.body.parentId > 0)) return [3, 7];
                        return [4, this.scenarioTreesRepository.findOneById(req.body.parentId)];
                    case 6:
                        parentNode = _a.sent();
                        if (parentNode) {
                            node.parent = parentNode;
                        }
                        _a.label = 7;
                    case 7: return [4, this.scenarioTreesRepository.upsert(node)];
                    case 8:
                        r = _a.sent();
                        node.id = r.id;
                        _a.label = 9;
                    case 9:
                        if (!(req.files && req.files['value'])) return [3, 11];
                        return [4, this.upload(req, 'value', 'scenario_tree_movie_' + node.id)];
                    case 10:
                        uploadResult = _a.sent();
                        node.value = uploadResult;
                        _a.label = 11;
                    case 11: return [4, this.scenarioTreesRepository.upsert(node)];
                    case 12:
                        _a.sent();
                        return [2, res.status(200).json({
                                message: 'Node is ' + (isNew ? 'created' : 'updated'),
                                data: node.id
                            })];
                    case 13:
                        error_7 = _a.sent();
                        console.log(error_7);
                        return [2, res.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 14: return [2];
                }
            });
        });
    };
    ScenarioController.prototype.deleteTreeNode = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var account, scenario, node, error_8;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4, this.findUsernameInRequest(req)];
                    case 1:
                        account = _a.sent();
                        return [4, this.repository.findOneById(req.params.id)];
                    case 2:
                        scenario = _a.sent();
                        if (lodash_1.default.isEmpty(scenario)) {
                            return [2, res.status(404).json({ message: 'Scenario not found' })];
                        }
                        return [4, this.scenarioTreesRepository.findOneById(req.params.nodeId)];
                    case 3:
                        node = _a.sent();
                        if (!node) {
                            return [2, res.status(404).json({ message: 'Node not found' })];
                        }
                        return [4, this.scenarioTreesRepository.deleteTreeNode(node)];
                    case 4:
                        _a.sent();
                        return [2, res.status(200).json({
                                message: 'Node is deleted'
                            })];
                    case 5:
                        error_8 = _a.sent();
                        console.log(error_8);
                        return [2, res.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 6: return [2];
                }
            });
        });
    };
    ScenarioController.prototype.updateInitialMovie = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var account, scenario, initialNode, uploadResult, uploadResult, error_9;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 11, , 12]);
                        return [4, this.findUsernameInRequest(req)];
                    case 1:
                        account = _a.sent();
                        return [4, this.repository.findOneById(req.params.id)];
                    case 2:
                        scenario = _a.sent();
                        if (!scenario) {
                            return [2, res.status(404).json({ message: 'Scenario not found' })];
                        }
                        return [4, this.scenarioInitialMovieRepository
                                .repository
                                .createQueryBuilder()
                                .where('scenario_id = :sc', { sc: scenario.id })
                                .getOne()];
                    case 3:
                        initialNode = _a.sent();
                        if (!initialNode) {
                            return [2, res.status(404).json({ message: 'Initial Node not found' })];
                        }
                        initialNode.dispValue = req.body.dispValue;
                        initialNode.percentage = req.body.percentage;
                        initialNode.movie_1stCount = req.body.movie1stCount;
                        initialNode.movie_2ndCount = req.body.movie2ndCount;
                        initialNode.updatedBy = account;
                        if (!req.body.movie_1st) return [3, 4];
                        initialNode.movie_1st = req.body.movie_1st;
                        return [3, 6];
                    case 4: return [4, this.upload(req, 'movie_1st', 'scenario_initial_movie_1st_' + initialNode.id)];
                    case 5:
                        uploadResult = _a.sent();
                        initialNode.movie_1st = uploadResult;
                        _a.label = 6;
                    case 6:
                        if (!req.body.movie_2nd) return [3, 7];
                        initialNode.movie_2nd = req.body.movie_2nd;
                        return [3, 9];
                    case 7: return [4, this.upload(req, 'movie_2nd', 'scenario_initial_movie_2nd_' + initialNode.id)];
                    case 8:
                        uploadResult = _a.sent();
                        initialNode.movie_2nd = uploadResult;
                        _a.label = 9;
                    case 9: return [4, this.scenarioInitialMovieRepository.update(initialNode.id, initialNode)];
                    case 10:
                        _a.sent();
                        return [2, res.status(200).json({
                                message: 'Initial Node is updated',
                                data: initialNode.id
                            })];
                    case 11:
                        error_9 = _a.sent();
                        console.log(error_9);
                        return [2, res.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 12: return [2];
                }
            });
        });
    };
    ScenarioController.prototype.list = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var record, error_10;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log('ScenarioController - list: ' + request);
                        return [4, this.repository.find()];
                    case 1:
                        record = _a.sent();
                        return [2, response.status(200).json(record)];
                    case 2:
                        error_10 = _a.sent();
                        console.log(error_10);
                        return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                    case 3: return [2];
                }
            });
        });
    };
    ScenarioController.prototype.delete = function (request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                try {
                    console.log('StoreSalespersonsController - delete: ' + request);
                    request.params.id
                        .split(',')
                        .map(function (id) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var scenario;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, this.repository.findOneById(id)];
                                case 1:
                                    scenario = _a.sent();
                                    if (!scenario) {
                                        return [2, response.status(400).json({ message: 'Record is not found' })];
                                    }
                                    return [4, this.repository.delete(scenario)];
                                case 2:
                                    _a.sent();
                                    console.log('deleted scenario', scenario);
                                    return [2];
                            }
                        });
                    }); });
                    return [2, response.status(200).json({ message: 'Multiple Record Deleted!' })];
                }
                catch (error) {
                    console.log(error);
                    return [2, response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE })];
                }
                return [2];
            });
        });
    };
    return ScenarioController;
}(Base_controller_1.BaseController));
exports.default = ScenarioController;
//# sourceMappingURL=Scenario.controller.js.map