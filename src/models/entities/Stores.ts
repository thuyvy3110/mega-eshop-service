import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseModel } from '../Base.models';
import { CampaignStores } from './CampaignStores';
import { Clients } from './Clients';
import { DisplayAccounts } from './DisplayAccounts';
import { StoreSalespersons } from './StoreSalespersons';
import { TabletAccounts } from './TabletAccounts';

@Index('stores_UNIQUE', ['storeName', 'clientId'], { unique: true })
@Index('fk_stores_clients1_idx', ['clientId'], {})
@Entity('stores')
export class Stores extends BaseModel {
	@Column({ length: 200 })
	storeName: string;

	@Column()
	clientId: number;

	@Column({ length: 200 })
	address: string;

	@Column({ length: 100 })
	officer: string;

	@Column({ length: 100 })
	contactInformation: string;

	@Column()
	memo: string;

	@ManyToOne(() => Clients, (clients) => clients.stores, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
	client: Clients;

	@OneToMany(() => CampaignStores, (campaignStores) => campaignStores.store, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'id', referencedColumnName: 'store_id' }])
	campaignStores: CampaignStores[];

	@OneToMany(
		() => StoreSalespersons,
		(storeSalespersons) => storeSalespersons.store, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'id', referencedColumnName: 'store_id' }])
	storeSalespersons: StoreSalespersons[];

	@OneToMany(() => TabletAccounts, (tabletAccounts) => tabletAccounts.store, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'NO ACTION',
	})
	tabletAccounts: TabletAccounts[];

	@OneToMany(() => DisplayAccounts, (displayAccounts) => displayAccounts.store, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'NO ACTION',
	})
	displayAccounts: DisplayAccounts[];
}
