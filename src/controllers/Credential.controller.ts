import { Request, Response, Router } from 'express';

import CryptoJS from 'crypto-js';

import { ErrCode } from '../lib/errCode';

class CredentialController {

    public router: Router = Router();
    public errCode = ErrCode;
    public path: string;
    constructor() {
        this.path = '/vs/credentials';
        this.customRoutes();
    }

    customRoutes() {
        this.router.get(this.path + '/:type',
            (req: Request, res: Response) => this.getCredentials(req, res));
    }

    private getCredentials = async (request: Request, response: Response) => {
        const type = request.params.type || undefined;
        if (!type) {
            return response.status(500).json({ err_code: this.errCode.ERROR_VALIDATION });
        }
        let data;
        switch (type) {
            case 'aws':
                data = {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
                    secretAccessKey: process.env.AWS_SECRET_KEY || '',
                    region: process.env.AWS_REGION || ''
                }
                break;

            default:
                return response.status(500).json({ err_code: this.errCode.ERROR_VALIDATION });
        }
        const key = 'ZxlNEnojO5HbQngiYvrqu32Br6V'
        const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
        return response.status(200).json(ciphertext);
    }
}

export default CredentialController;