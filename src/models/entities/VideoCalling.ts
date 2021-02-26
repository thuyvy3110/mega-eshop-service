import { Column, Entity } from 'typeorm';

import { BaseModel } from '../Base.models';

@Entity('video_calling')
export class VideoCalling extends BaseModel {

  @Column()
  accountId: number;

  @Column()
  campaignId: number;

  @Column()
  storeId: number;

  @Column()
  salespersonId: number;

  @Column()
  startedAt: Date;

  @Column()
  stoppedAt: Date;
}
