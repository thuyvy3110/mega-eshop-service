import { getRepository } from 'typeorm';
import { TabletAccounts } from '../models/entities/TabletAccounts';
import { BaseRepository } from './BaseRepository.repository';
import jwt_decode from "jwt-decode";

export class TabletAccountsRepository extends BaseRepository<TabletAccounts> {

  constructor() {
    super(TabletAccounts);
  }

  public async getUserInfoByJwt(token: any) {
    const execData: any = jwt_decode(token);
    const cognitoName = execData["username"];

    const data = await getRepository(TabletAccounts)
      .createQueryBuilder("tablet_accounts")
      .leftJoinAndSelect("tablet_accounts.store", "stores")
      .leftJoinAndSelect("stores.client", "clients")
      .leftJoinAndSelect("clients.languageType2", "languages")
      .where('account = :name', { name: cognitoName })
      .getOne();
    return {
      id: data?.id,
      account: data?.account,
      store: {
        storeId: data?.storeId,
        storeName: data?.store?.storeName
      },
      client: {
        clientId: data?.store?.client?.id,
        clientName: data?.store?.client?.name,
        description: data?.store?.client?.description,
        headerImage: data?.store?.client?.headerImage
      },
      language: data?.store?.client?.languageType2?.language
    }
  }

  public async findByAccount(account: string) {
    return this.repository.findOne({ account: account });
  }

  public async deleteByStoreId(storeId: any) {
    return await this.repository.delete({ 'storeId': storeId });
  }
}