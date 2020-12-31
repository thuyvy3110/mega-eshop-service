import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../Base.models';
import { Clients } from './Clients';
import { ScenarioInitialMovies } from './ScenarioInitialMovies';
import { ScenarioTrees } from './ScenarioTrees';

@Index('scenarios_UNIQUE', ['scenarioName', 'clientId'], { unique: true })
@Index('fk_scenarios_clients1_idx', ['clientId'], {})
@Entity('scenarios')
export class Scenarios extends BaseModel {

	@Column({ length: 200 })
	scenarioName: string;

	@Column()
	clientId: number;

	@Column()
	categoryId: number;

	@Column()
	campaignId: number;

	@Column()
	content: string;

	@OneToMany(
		() => ScenarioInitialMovies,
		(scenarioInitialMovies) => scenarioInitialMovies.scenario,
		{ cascade: ['insert'] }
	)
	scenarioInitialMovies: ScenarioInitialMovies;

	@OneToMany(
		() => ScenarioTrees,
		(scenarioTrees) => scenarioTrees.scenario
	)
	scenarioTrees: ScenarioTrees[];

	@ManyToOne(
		() => Clients,
		(clients) => clients.scenarios,
		{ onDelete: 'NO ACTION', onUpdate: 'NO ACTION' }
	)
	@JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
	client: Clients;
}
