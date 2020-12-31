import { Request, Response } from 'express';
import { AdminUsers } from '../models/entities/AdminUsers';
import { AdminUsersRepository } from '../repositories/AdminUsers.repository';
import { BaseController } from './Base.controller';

class AdminUsersController extends BaseController<AdminUsers, AdminUsersRepository> {

    constructor () {
        super(AdminUsers, '/vs/admin-users');
    }

    initRepository () {
        return new AdminUsersRepository();
  }

    customRoutes () {
        this.router.get(this.path + '/getUserInfoByJwt/routes', (req: Request, res: Response) => this.getDataMethod(req, res));
    }

    getDataMethod = async (request: Request, response: Response) => {
        try {
            const token = request.get('Authorization')?.replace('Bearer ', '')
            const data = await this.repository.getUserInfoByJwt(token);
            return response.status(200).json(data);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
        }
    }
}

export default AdminUsersController;