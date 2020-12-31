import { Column, Entity } from 'typeorm'
import { BaseModel } from '../Base.models'

@Entity('logs')
export class Logs extends BaseModel {

    @Column()
    storeId: number

    @Column()
    customerId: number

    @Column()
    tappedNodeId: number

    @Column()
    videoCallingId: number
}
