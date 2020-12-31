import { Scenarios } from '../models/entities/Scenarios';
import { BaseRepository } from './BaseRepository.repository';
import axios from 'axios';

export class ScenarioRepository extends BaseRepository<Scenarios> {

	constructor () {
		super(Scenarios);
	}

	public async customMethod (clientId: any) {
		return 'custom';
	}

	public async getScenarioWithoutLevel1() {
		let json = await axios.get(
			`https://script.google.com/macros/s/${process.env.GOOGLE_APP_SCRIPT_ID}/exec?method=combineScenarioWithoutNode1`
	)
	return json.data;
	}

}