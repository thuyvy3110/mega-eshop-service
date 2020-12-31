import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../Base.models';
import { AdminUsers } from './AdminUsers';
import { Campaigns } from './Campaigns';
import { Categories } from './Categories';
import { Languages } from './Languages';
import { Products } from './Products';
import { SalePerson } from './Salespersons';
import { Scenarios } from './Scenarios';
import { Stores } from './Stores';

@Index('client_roles_UNIQUE', ['name'], { unique: true })
@Entity('clients')
export class Clients extends BaseModel {

	@Column({ length: 100 })
	name: string;

	@Column({ length: 100 })
	type: string;

	@Column()
	languageType: number;

	@Column()
	parentType: number;

	@Column()
	parentClientId: number;

	@Column({ length: 100 })
	description: string;

	@OneToMany(() => AdminUsers, (adminUsers) => adminUsers.client)
	adminUsers: AdminUsers[];

	@OneToMany(() => Campaigns, (campaigns) => campaigns.client)
	campaigns: Campaigns[];

	@OneToMany(() => Categories, (categories) => categories.client)
	categories: Categories[];

	@ManyToOne(() => Languages, (languages) => languages.clients, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'language_type', referencedColumnName: 'id' }])
	languageType2: Languages;

	@OneToMany(() => Products, (products) => products.client)
	products: Products[];

	@OneToMany(() => SalePerson, (saleperson) => saleperson.client)
	salespersons: SalePerson[];

	@OneToMany(() => Scenarios, (scenarios) => scenarios.client)
	scenarios: Scenarios[];

	@OneToMany(() => Stores, (stores) => stores.client)
	stores: Stores[];
}
