import { BaseRepository } from './BaseRepository.repository'
import { Logs } from '../models/entities/Logs'

export class LogsRepository extends BaseRepository<Logs> {

    constructor() {
        super(Logs)
    }

    async getLastCustomerId() {
        const latest = await this.repository.findOne({
            order: {
                id: 'DESC'
            }
        });
        if (latest) {
            return +latest.customerId;
        }
        return 0;
    }
}