import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../Base.models';
import { Scenarios } from './Scenarios';


// @Index('fk_scenario_initial_movies_scenarios1_idx', ['scenarioId',], {})
@Entity('scenario_initial_movies')
export class ScenarioInitialMovies extends BaseModel {

	@Column({ name: 'movie_1st', length: 500 })
	movie_1st: string;

	@Column({ name: 'movie_2nd', length: 500 })
	movie_2nd: string;

	@Column('int', { name: 'percentage' })
	percentage: number;

	@Column({ name: 'movie_1st_count' })
	movie_1stCount: number;

	@Column({ name: 'movie_2nd_count' })
	movie_2ndCount: number;

	@ManyToOne(() => Scenarios, scenarios => scenarios.scenarioInitialMovies, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'scenario_id' })
	scenario: Scenarios;

	@Column({ length: 100 })
	dispValue: string;

	@Column({select: false, insert: false, update: false})
	parentId: string;

	@Column({select: false, insert: false, update: false})
	nodeId: string;

	@Column({select: false, insert: false, update: false})
	scenarioType: string;

	@Column()
	scenarioId: number;

	toJSON() {
		this.parentId = "-1";
		this.nodeId = "0";
		this.scenarioType = 'TOPNODE';
		return this;
	}
}
