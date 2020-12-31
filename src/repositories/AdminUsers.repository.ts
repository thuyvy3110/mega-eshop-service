import { getRepository } from 'typeorm';
import { AdminUsers } from '../models/entities/AdminUsers';
import { BaseRepository } from './BaseRepository.repository';
import jwt_decode from "jwt-decode";

export class AdminUsersRepository extends BaseRepository<AdminUsers> {

	constructor () {
		super(AdminUsers);
	}

  public async getUserInfoByJwt (token: any) {
    console.log(`Get Admin Users Information : ...`)
    const execData : any = jwt_decode(token);
    const cognitoName = execData["username"]

    const data = await getRepository(AdminUsers)
      .createQueryBuilder("admin_users")
      .leftJoinAndSelect("admin_users.client", "clients")
      .leftJoinAndSelect("clients.languageType2", "languages")
      .where('account = :name', { name: cognitoName })
      .getOne();
    return {
      client: {
        clientId: data?.client?.id,
        clientName: data?.client?.name
      },
      language: data?.client?.languageType2?.language,
      admin:{
        account: cognitoName,
        name: data?.name
      }
    }
  }

  public async findByAccount(account: string) {
	  return this.repository.findOne({account: account});
  }
}
