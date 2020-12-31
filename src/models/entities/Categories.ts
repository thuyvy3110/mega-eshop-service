import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../Base.models';
import { Campaigns } from './Campaigns';
import { Clients } from './Clients';
import { Products } from './Products';

@Index('categories_UNIQUE', ['categoryType', 'campaignCategoryName'], {
	unique: true,
})
@Index('fk_categories_clients1_idx', ['clientId'], {})
@Entity('categories')
export class Categories extends BaseModel {

	@Column({ length: 50, })
	categoryType: string;

	@Column({ length: 100, })
	campaignCategoryName: string;

	@Column()
	clientId: number;

	@OneToMany(() => Campaigns, (campaigns) => campaigns.category)
	campaigns: Campaigns[];

	@ManyToOne(() => Clients, (clients) => clients.categories, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
	client: Clients;

	@OneToMany(() => Products, (products) => products.category)
	products: Products[];
}
