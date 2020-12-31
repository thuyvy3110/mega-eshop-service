import { AdminUsersRepository } from './AdminUsers.repository'
import { SalespersonRepository } from './SalesPerson.repository'
import { DisplayAccountsRepository } from './DisplayAccounts.repository'
import { TabletAccountsRepository } from './TabletAccounts.repository'
import { ClientRepository } from './Client.repository'

export class BaseAccountRepository {

    public adminRepository: AdminUsersRepository
    public salesPersonRepository: SalespersonRepository
    public displayRepository: DisplayAccountsRepository
    public tabletRepository: TabletAccountsRepository
    public clientRepository: ClientRepository

    constructor() {
        this.adminRepository = new AdminUsersRepository()
        this.salesPersonRepository = new SalespersonRepository()
        this.displayRepository = new DisplayAccountsRepository()
        this.tabletRepository = new TabletAccountsRepository()
        this.clientRepository = new ClientRepository()
    }

    public async getClientId(account: string, poolname: string) {
        let clientId = 0
        if (poolname == 'admin') {
            const user = await this.getAccountAdmin(account);
            clientId = user?.clientId || 0
        } else if (poolname == 'display') {
            const user = await this.getAccountDisplay(account);
            clientId = 0
        } else if (poolname == 'sales_person') {
            const user = await this.getAccountSalesPerson(account);
            clientId = user?.clientId || 0
        } else if (poolname == 'tablet') {
            const user = await this.getAccountTablet(account);
            clientId = 0
        }

        return clientId
    }



    public async getClientObject(account: string, poolname: string) {
        let clientId = await this.getClientId(account, poolname);
        return this.clientRepository.findOneById(clientId);
    }

    public async getAccountAdmin(account: string) {
        return await this.adminRepository.findByAccount(account);
    }

    public async getAccountDisplay(account: string) {
        return await this.displayRepository.findByAccount(account);
    }

    public async getAccountTablet(account: string) {
        return await this.tabletRepository.findByAccount(account);
    }

    public async getAccountSalesPerson(account: string) {
        return await this.salesPersonRepository.findByAccount(account);
    }

}
