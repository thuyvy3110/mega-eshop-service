import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../Base.models';
import { CampaignProducts } from './CampaignProducts';
import { Categories } from './Categories';
import { Clients } from './Clients';
import { ProductImgs } from './ProductImgs';

@Index(
	'products_UNIQUE',
	['productName', 'clientId', 'categoryId', 'companyName'],
	{ unique: true }
)
@Index('fk_products_categories1_idx', ['categoryId'], {})
@Index('fk_products_clients1_idx', ['clientId'], {})
@Entity('products')
export class Products extends BaseModel {

	@Column({ length: 200 })
	productName: string;

	@Column()
	clientId: number;

	@Column()
	categoryId: number;

	@Column({ length: 100 })
	companyName: string;

	@Column({ length: 100 })
	price: string;

	@Column({ length: 200 })
	url: string;

	@Column()
	description: string;

	@Column()
	memo: string;

	@OneToMany(
		() => CampaignProducts,
		(campaignProducts) => campaignProducts.product
	)
	campaignProducts: CampaignProducts[];

	@OneToMany(() => ProductImgs, (productImgs) => productImgs.product)
	productImgs: ProductImgs[];

	@ManyToOne(() => Categories, (categories) => categories.products, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
	category: Categories;

	@ManyToOne(() => Clients, (clients) => clients.products, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
	client: Clients;
}
