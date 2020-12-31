import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import {BaseModel} from '../Base.models';
import { Campaigns } from './Campaigns';
import { Stores } from './Stores';
import { VideoCalling } from './VideoCalling'

@Index('campaign_stores_UNIQUE', ['campaignId', 'storeId'], { unique: true })
@Index('fk_campaign_stores_stores1_idx', ['storeId'], {})
@Entity('campaign_stores')
export class CampaignStores extends BaseModel{

	@Column()
	campaignId: number;

	@Column()
	storeId: number;

	@ManyToOne(() => Campaigns, (campaigns) => campaigns.campaignStores, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'campaign_id', referencedColumnName: 'id' }])
	campaign: Campaigns;

	@ManyToOne(() => Stores, (stores) => stores.campaignStores, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }])
	store: Stores;

	@OneToMany(() => VideoCalling, (videoCalling) => videoCalling.campaignStore)
	videoCallings: VideoCalling[];
}
