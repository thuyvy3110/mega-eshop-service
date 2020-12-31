import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import { TabletAccounts } from "./TabletAccounts";
import { CampaignStores } from "./CampaignStores";
import { SalePerson } from "./Salespersons"
import { BaseModel } from '../Base.models'

@Index("index2", ["accountId", "campaignStoreId", "salespersonId"], {})
@Index("fk_video_calling_campaign_store_idx", ["campaignStoreId"], {})
@Index("fk_video_calling_salesperson_idx", ["salespersonId"], {})
@Entity("video_calling")
export class VideoCalling extends BaseModel{

  @Column()
  accountId: number;

  @Column()
  campaignStoreId: number;

  @Column()
  salespersonId: number;

  @Column()
  startedAt: Date;

  @Column()
  stoppedAt: Date;

  @ManyToOne(
    () => TabletAccounts,
    (tabletAccounts) => tabletAccounts.videoCallings,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "account_id", referencedColumnName: "id" }])
  account: TabletAccounts;

  @ManyToOne(
    () => CampaignStores,
    (campaignStores) => campaignStores.videoCallings,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "campaign_store_id", referencedColumnName: "id" }])
  campaignStore: CampaignStores;

  @ManyToOne(() => SalePerson, (salespersons) => salespersons.videoCallings, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "salesperson_id", referencedColumnName: "id" }])
  salesperson: SalePerson;
}
