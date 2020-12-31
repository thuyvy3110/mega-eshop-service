import { BaseRepository } from './BaseRepository.repository'
import { VideoCalling } from '../models/entities/VideoCalling'

export class VideoCallingRepository extends BaseRepository<VideoCalling> {

    constructor() {
        super(VideoCalling)
    }

}
