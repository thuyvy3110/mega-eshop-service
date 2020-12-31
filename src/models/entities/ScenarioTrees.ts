import { Column, Entity, Index, JoinColumn, ManyToOne, Tree, TreeChildren, TreeParent } from 'typeorm'
import { BaseModel } from '../Base.models';
import { Scenarios } from './Scenarios';

@Index(
	'scenario_trees_UNIQUE',
	['scenarioId', 'scenarioType', 'dispValue', 'parentId'],
	{ unique: true }
)
@Entity('scenario_trees')
@Tree("materialized-path")
export class ScenarioTrees extends BaseModel {

	@Column()
	scenarioId: number;

	@Column({ length: 100 })
	scenarioType: string;

	@Column({ length: 100 })
	dispValue: string;

	@Column({ length: 100 })
	value: string;

	@Column({ length: 100 })
	scenarioReference: string;

	@Column()
	scenarioReferenceId: number;

	@Column()
	parentId: number;

	@ManyToOne(() => Scenarios, (scenarios) => scenarios.scenarioTrees, {
		onDelete: 'CASCADE',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'scenario_id', referencedColumnName: 'id' }])
	scenario: Scenarios;

	@Column({select: false, insert: false, update: false})
	nodeId: number;

	toJSON() {
		this.nodeId = this.id;
		return this;
	}

	@TreeChildren()
	children: ScenarioTrees[]

	@TreeParent()
	parent: ScenarioTrees
}
