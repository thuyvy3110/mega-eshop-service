import { Request, Response } from 'express';
import _ from 'lodash';

import { Customers } from '../models/entities/Customers';
import { CustomerRepository } from '../repositories/Customer.repository';
import { BaseController } from './Base.controller';

class CustomerController extends BaseController<Customers, CustomerRepository> {

    constructor() {
        super(Customers, '/vs/customer');
    }

    initRepository() {
        return new CustomerRepository();
    }

    customRoutes() {
        this.router.post(this.path + '/getNextCustomerId', (req: Request, res: Response) => this.createNewCustomerId(req, res));
    }

    /**
     * When user enter/refresh the tablet page, we create a customer ID and assigned to client.<br/>
     * body:
     * {
     *     type: string
     * }
     *
     * @param request
     * @param response
     */
    createNewCustomerId = async (request: Request, response: Response) => {
        try {
            if (_.isEmpty(request.body.type)) {
                return response.status(500).json({ status: 'error', message: 'Bad Request' });
            }
            const accountName = await this.findUsernameInRequest(request);

            const customers = new Customers();
            customers.createdBy = accountName;
            customers.updatedBy = accountName;
            customers.type = request.body.type;
            await this.repository.insert(customers);
            return response.status(200).json({ 'customerId': customers.id });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ err_code: this.errCode.ERROR_RESPONSE });
        }
    }

    async find(request: Request, response: Response): Promise<Response<any>> {
        return response.status(500).json({
            status: 'error',
            message: 'Not supported',
            err_code: this.errCode.ERROR_RESPONSE
        });
    }

    async findOne(request: Request, response: Response): Promise<Response<any>> {
        return response.status(500).json({ status: 'error', message: 'Not supported', err_code: this.errCode.ERROR_RESPONSE });
    }

    async paginate(request: Request, response: Response): Promise<Response<any>> {
        return response.status(500).json({ status: 'error', message: 'Not supported', err_code: this.errCode.ERROR_RESPONSE });
    }

    async delete(request: Request, response: Response): Promise<Response<any>> {
        return response.status(500).json({ status: 'error', message: 'Not supported', err_code: this.errCode.ERROR_RESPONSE });
    }

    async update(request: Request, response: Response): Promise<Response<any>> {
        return response.status(500).json({ status: 'error', message: 'Not supported', err_code: this.errCode.ERROR_RESPONSE });
    }
}

export default CustomerController;