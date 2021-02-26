import * as bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { pagination } from 'typeorm-pagination';

import App from './app';
import AdminUsersController from './src/controllers/AdminUsers.controller';
import CampaignController from './src/controllers/Campaign.controller';
import CategoryController from './src/controllers/Category.controller';
import ClientController from './src/controllers/Client.controller';
import DisplayAccountsController from './src/controllers/DisplayAccounts.controller';
import LanguageController from './src/controllers/Language.controller';
import LogController from './src/controllers/Log.controller';
import ProductController from './src/controllers/Product.controller';
import SaleAreaController from './src/controllers/SaleArea.controller';
import SalespersonsController from './src/controllers/SalesPerson.controller';
import ScenarioController from './src/controllers/Scenario.controller';
import StoreController from './src/controllers/Store.controller';
import StoreSalespersonsController from './src/controllers/StoreSalesPerson.controller';
import TabletAccountsController from './src/controllers/TabletAccounts.controller';
import CustomerController from './src/controllers/Customer.controller';
import CredentialController from './src/controllers/Credential.controller';

dotenv.config();

const env = process.env;
const ormOptions: any = {
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
	namingStrategy: new SnakeNamingStrategy()
};

createConnection(ormOptions)
    .then(value => {
        console.log('3306: [SUCCESS] Database connected!');
        startApp()
    })
    .catch(error => {
        console.log('3306: [ERROR] Database error');
        console.log(`ERROR: ${error}`);
    });


let backend: App;
function startApp () {
	backend = new App({
		// Controllers list of application
		controllers: [
			new ScenarioController(),
			new ClientController(),
			new CategoryController(),
			new LanguageController(),
			new TabletAccountsController(),
			new AdminUsersController(),
			new DisplayAccountsController(),
			new ProductController(),
			new CampaignController(),
			new StoreSalespersonsController(),
			new SalespersonsController(),
			new SaleAreaController(),
			new StoreController(),
			new LogController(),
			new CustomerController(),
			new CredentialController()
		],
		// Middlewares list of application
		middleWares: [
			cors(),
			pagination,
			bodyParser.json(),
			bodyParser.urlencoded({ extended: true })
		],
		port: Number(process.env.PORT)
	});
	// Run Express app and start DB connection
	backend.listen();
}