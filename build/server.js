"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var bodyParser = tslib_1.__importStar(require("body-parser"));
var cors_1 = tslib_1.__importDefault(require("cors"));
var dotenv = tslib_1.__importStar(require("dotenv"));
var typeorm_1 = require("typeorm");
var typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
var typeorm_pagination_1 = require("typeorm-pagination");
var app_1 = tslib_1.__importDefault(require("./app"));
var AdminUsers_controller_1 = tslib_1.__importDefault(require("./src/controllers/AdminUsers.controller"));
var Campaign_controller_1 = tslib_1.__importDefault(require("./src/controllers/Campaign.controller"));
var Category_controller_1 = tslib_1.__importDefault(require("./src/controllers/Category.controller"));
var Client_controller_1 = tslib_1.__importDefault(require("./src/controllers/Client.controller"));
var DisplayAccounts_controller_1 = tslib_1.__importDefault(require("./src/controllers/DisplayAccounts.controller"));
var Language_controller_1 = tslib_1.__importDefault(require("./src/controllers/Language.controller"));
var Log_controller_1 = tslib_1.__importDefault(require("./src/controllers/Log.controller"));
var Product_controller_1 = tslib_1.__importDefault(require("./src/controllers/Product.controller"));
var SaleArea_controller_1 = tslib_1.__importDefault(require("./src/controllers/SaleArea.controller"));
var SalesPerson_controller_1 = tslib_1.__importDefault(require("./src/controllers/SalesPerson.controller"));
var Scenario_controller_1 = tslib_1.__importDefault(require("./src/controllers/Scenario.controller"));
var Store_controller_1 = tslib_1.__importDefault(require("./src/controllers/Store.controller"));
var StoreSalesPerson_controller_1 = tslib_1.__importDefault(require("./src/controllers/StoreSalesPerson.controller"));
var TabletAccounts_controller_1 = tslib_1.__importDefault(require("./src/controllers/TabletAccounts.controller"));
dotenv.config();
var env = process.env;
var ormOptions = {
    type: env.TYPEORM_CONNECTION,
    host: env.TYPEORM_HOST,
    port: env.TYPEORM_PORT,
    username: env.TYPEORM_USERNAME,
    password: env.TYPEORM_PASSWORD,
    database: env.TYPEORM_DATABASE,
    logging: ["query", "error"],
    entities: ['./build/src/models/**/*.js', './build/src/models/*.js', __dirname + '/**/**/entities/*.ts'],
    migrations: ['./build/src/migrations/*.js'],
    migrationsRun: true,
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy()
};
typeorm_1.createConnection(ormOptions)
    .then(function (value) {
    console.log('3306: [SUCCESS] Database connected!');
    startApp();
})
    .catch(function (error) {
    console.log('3306: [ERROR] Database error');
    console.log("ERROR: " + error);
});
var backend;
function startApp() {
    backend = new app_1.default({
        controllers: [
            new Scenario_controller_1.default(),
            new Client_controller_1.default(),
            new Category_controller_1.default(),
            new Language_controller_1.default(),
            new TabletAccounts_controller_1.default(),
            new AdminUsers_controller_1.default(),
            new DisplayAccounts_controller_1.default(),
            new Product_controller_1.default(),
            new Campaign_controller_1.default(),
            new StoreSalesPerson_controller_1.default(),
            new SalesPerson_controller_1.default(),
            new SaleArea_controller_1.default(),
            new Store_controller_1.default(),
            new Log_controller_1.default()
        ],
        middleWares: [
            cors_1.default(),
            typeorm_pagination_1.pagination,
            bodyParser.json(),
            bodyParser.urlencoded({ extended: true })
        ],
        port: Number(process.env.PORT)
    });
    backend.listen();
}
//# sourceMappingURL=server.js.map