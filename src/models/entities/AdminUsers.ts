import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../Base.models';
import { Clients } from './Clients';

@Index('users_UNIQUE', ['account', 'clientId'], {unique: true})
@Index('fk_admin_users_clients1_idx', ['clientId'], {})
@Entity('admin_users')
export class AdminUsers extends BaseModel {
	@Column({length: 100})
	account: string;

	@Column({nullable: true, length: 100})
	name: string;

	@Column('bigint', {name: 'client_id'})
	clientId: number;

	@ManyToOne(() => Clients, (clients) => clients.adminUsers, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{name: 'client_id', referencedColumnName: 'id'}])
	client: Clients;
}
