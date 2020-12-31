import { Languages } from '../models/entities/Languages';
import { LanguageRepository } from '../repositories/Language.repository';
import { BaseController } from './Base.controller';

class LanguageController extends BaseController<Languages, LanguageRepository> {

	constructor () {
		super(Languages, '/vs/language');
	}

	initRepository () {
		return new LanguageRepository();
	}

	customRoutes () {
		return;
	}
}
export default LanguageController;