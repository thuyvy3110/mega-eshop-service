import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from 'typeorm';
import { BaseModel } from '../Base.models';
import { Campaigns } from './Campaigns';
import { Products } from './Products';

@Index('campaign_products_UNIQUE', ['campaignId', 'productId'], {
	unique: true,
})
@Index('fk_campaign_products_products1_idx', ['productId'], {})
@Entity('campaign_products')
export class CampaignProducts extends BaseModel {

	@Column()
	campaignId: number;

	@Column()
	productId: number;

	@ManyToOne(() => Campaigns, (campaigns) => campaigns.campaignProducts, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{name: 'campaign_id', referencedColumnName: 'id'}])
	campaign: Campaigns;

	@ManyToOne(() => Products, (products) => products.campaignProducts, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{name: 'product_id', referencedColumnName: 'id'}])
	product: Products;
}
