import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { OneToOne } from 'typeorm/decorator/relations/OneToOne';

import { BaseModel } from '../Base.models';
import { Categories } from './Categories';
import { Clients } from './Clients';
import { SalespersonsAreas } from './SalespersonsAreas';
import { StoreSalespersons } from './StoreSalespersons';
import { VideoCalling } from './VideoCalling';

@Index('salespersons_UNIQUE', ['name', 'clientId'], { unique: true })
@Index('fk_salespersons_clients1_idx', ['clientId'], {})
@Index('fk_salespersons_category_idx', ['categoryId'], {})
@Entity('salespersons')
export class SalePerson extends BaseModel {

	@Column({ length: 100 })
	name: string;

	@Column()
	clientId: number;

	@Column({length: 100})
	account: string;

	@Column({ length: 10 })
	evaluation: string;

	@Column({ length: 100 })
	company: string;

	@Column({ length: 200 })
	contactInformation: string;

	@Column({ length: 100 })
	officer: string;

	@Column()
	categoryId: number;

	@Column()
	memo: string;

	@ManyToOne(() => Clients, (clients) => clients.salespersons, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
	client: Clients;

	@OneToOne(() => Categories)
	@JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
	category: Categories;

	@OneToMany(
		() => SalespersonsAreas,
		(salespersonsAreas) => salespersonsAreas.salesperson
	)
	salespersonsAreas: SalespersonsAreas[];

	@OneToMany(
		() => StoreSalespersons,
		(storeSalespersons) => storeSalespersons.salesperson
	)
	storeSalespersons: StoreSalespersons[];

	@OneToMany(() => VideoCalling, (videoCalling) => videoCalling.salesperson)
	videoCallings: VideoCalling[];
}
