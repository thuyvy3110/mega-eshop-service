import { Clients } from '../models/entities/Clients';
import { Request, Response } from 'express';
import { ClientRepository } from '../repositories/Client.repository';
import { BaseController } from './Base.controller';

class ClientController extends BaseController<Clients, ClientRepository> {

	constructor () {
		super(Clients, '/vs/client');
	}

	initRepository () {
		return new ClientRepository();
	}

	customRoutes () {
		this.router.get(this.path + '/getClientByType/routes/:clientType', (req: Request, res: Response) => this.getClientByType(req, res));
	}

	getClientByType = async (request: Request, response: Response) => {
		try {
			const data = await this.repository.getClientByType(request.params.clientType);
			return response.status(200).json(data);
		} catch (error) {
			console.log(error);
			return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
		}
	}
}

export default ClientController;