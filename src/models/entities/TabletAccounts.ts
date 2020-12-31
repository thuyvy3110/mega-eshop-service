import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

import { BaseModel } from '../Base.models'
import { Stores } from './Stores'
import { VideoCalling } from './VideoCalling'

@Index('tablet_accounts_UNIQUE', ['account', 'storeId'], { unique: true })
@Index('fk_tablet_accounts_stores1_idx', ['storeId'], {})
@Entity('tablet_accounts')
export class TabletAccounts extends BaseModel {

    @Column({ length: 100 })
    account: string

    @Column()
    storeId: number

    @ManyToOne(() => Stores, (stores) => stores.tabletAccounts, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
    })
    @JoinColumn([{ name: 'store_id', referencedColumnName: 'id' }])
    store: Stores

    @OneToMany(() => VideoCalling, (videoCalling) => videoCalling.account)
    videoCallings: VideoCalling[]
}
