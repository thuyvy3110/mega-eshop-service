import {Column, Entity, Index, JoinColumn, ManyToOne} from 'typeorm';
import {BaseModel} from '../Base.models';
import {Stores} from './Stores';

@Index('display_accounts_UNIQUE', ['account', 'storeId'], {unique: true})
@Index('fk_display_accounts_stores1_idx', ['storeId'], {})
@Entity('display_accounts')
export class DisplayAccounts extends BaseModel {

		@Column({length: 100})
		account: string;

		@Column()
		storeId: number;

		@ManyToOne(() => Stores, (stores) => stores.displayAccounts, {
				onDelete: 'NO ACTION',
				onUpdate: 'NO ACTION',
		})
		@JoinColumn([{name: 'store_id', referencedColumnName: 'id'}])
		store: Stores;
}
