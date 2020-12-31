import { Column, Entity, Index, JoinColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm'

import { BaseModel } from '../Base.models';
import { SalePerson } from './Salespersons';
import { Stores } from './Stores';

@Index('store_salespersons_UNIQUE', ['storeId', 'salespersonId'], {
	unique: true,
})
@Index('fk_store_salespersons_salespersons1_idx', ['salespersonId'], {})
@Entity('store_salespersons')
export class StoreSalespersons extends BaseModel {

	@Column()
	storeId: number;

	@Column()
	salespersonId: number;


	@OneToMany(
			() => SalePerson,
			(salespersons) => salespersons.storeSalespersons
	)
	@JoinColumn([{name: 'salesperson_id', referencedColumnName: 'id'}])
	salesperson: any;	// TODO fix entity definition, should be array

	@ManyToOne(() => Stores, (stores) => stores.storeSalespersons, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }])
	store: Stores;
}
