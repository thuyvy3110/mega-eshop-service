import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseModel } from '../Base.models';
import { CampaignProducts } from './CampaignProducts';
import { CampaignStores } from './CampaignStores';
import { Categories } from './Categories';
import { Clients } from './Clients';
import { Scenarios } from './Scenarios';

@Index('campaigns_UNIQUE', ['campaignName', 'clientId'], { unique: true })
@Index('fk_campaigns_scenarios1_idx', ['scenario'], {})
@Index('fk_campaigns_clients1_idx', ['clientId'], {})
@Index('fk_campaigns_categories1_idx', ['categoryId'], {})
@Entity('campaigns')
export class Campaigns extends BaseModel {

	@Column()
	campaignName: string;

	@Column()
	clientId: number;

	@Column()
	categoryId: number;

	@Column('datetime', { name: 'start_date', comment: 'é–‹å§‹æ—¥' })
	startDate: Date;

	@Column('datetime', { name: 'end_date', comment: 'çµ‚äº†æ—¥' })
	endDate: Date;

	@Column('text', { name: 'content', nullable: true, comment: 'å†…å®¹' })
	content: string;

	@Column({ length: 50, })
	status: string;

	@Column()
	periods: string;

	@Column()
	goods: string;

	@Column()
	dueDate: string;

	@Column({ length: 100 })
	image1: string;

	@Column({ length: 100 })
	image2: string;

	@Column({ length: 100 })
	image3: string;

	@Column({ length: 100 })
	image4: string;

	@Column({ length: 100 })
	image5: string;

	@OneToMany(
		() => CampaignProducts,
		(campaignProducts) => campaignProducts.campaign
	)
	campaignProducts: CampaignProducts[];

	@OneToMany(
		() => CampaignStores,
		(campaignStores) => campaignStores.campaign)
	campaignStores: CampaignStores;

	@ManyToOne(() => Categories, (categories) => categories.campaigns, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
	category: Categories;

	@ManyToOne(() => Clients, (clients) => clients.campaigns, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
	client: Clients;

	@ManyToOne(() => Scenarios, (scenarios) => scenarios.campaignId, {
		onDelete: 'NO ACTION',
		onUpdate: 'NO ACTION',
	})
	@JoinColumn([{ name: 'scenario', referencedColumnName: 'id' }])
	scenario: Scenarios;
}
