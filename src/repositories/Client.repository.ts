import { getRepository } from 'typeorm';
import { Clients } from '../models/entities/Clients';
import { BaseRepository } from './BaseRepository.repository';

export class ClientRepository extends BaseRepository<Clients> {

	constructor () {
		super(Clients);
	}

	public async getClientByType (clientType: any) {
		return await getRepository(Clients)
				.createQueryBuilder()
				.where('type = :clientType', { clientType })
				.getOne();
	}
}
