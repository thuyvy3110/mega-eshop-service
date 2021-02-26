import cors from 'cors';
import { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

const express = require('express');
const fileUpload = require('express-fileupload');

const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token'
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: process.env.FE_BASE_URL,
    preflightContinue: false
}

class App {
    public app: Application;
    public port: number;

    constructor(appInit: { port: number; middleWares: any; controllers: any }) {
        this.app = express();
        this.app.use(helmet());
        this.app.use(cors(options));
        this.app.use(morgan('dev'));
        // enable files upload
        this.app.use(
            fileUpload({
                createParentPath: true,
                useTempFiles: true,
                tempFileDir: '/tmp/'
            })
        )
        this.port = appInit.port;
        this.middlewares(appInit.middleWares);
        this.app.use(cors());
        this.app.options('*', cors());
        this.routes(appInit.controllers);
    }

    private middlewares(middleWares: {
        forEach: (arg0: (middleWare: any) => void) => void
    }) {
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare);
        })
    }

    private routes(controllers: {
        forEach: (arg0: (controller: any) => void) => void
    }) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        })
    }

    public listen() {
        var http = require('http').Server(this.app);
        var io = require('socket.io')(http, { path: '/vs/socket.io' });
        const redisAdapter = require('socket.io-redis');
        io.adapter(redisAdapter({ host: process.env.REDIS_ENDPOINT, port: process.env.REDIS_PORT }));

        http.listen(this.port, () => {
            console.log(`${this.port}: [SUCCES] Express app is running!`)
        });

        io.on('connection', function (socket: any) {
            console.log(socket.id + ': connected');

            socket.on('salespersonMakeCalling', (data: any) => {
                io.sockets.emit('salespersonMakeCalling', { data: data, id: socket.id });
                console.log('salespersonMakeCalling .... ', data);
            });
            socket.on('startCallingFromSalesPerson', (data: any) => {
                io.sockets.emit('startCallingFromSalesPerson', { data: data, id: socket.id });
                console.log('startCallingFromSalesPerson .... ', data);
            });
            socket.on('pressNode', (data: any) => {
                io.sockets.emit('pressNode', { data: data, id: socket.id });
                console.log('user press on a node ', data);
            });
            socket.on('onLineBusy', (data: any) => {
                io.sockets.emit('onLineBusy', { data: data, id: socket.id });
                console.log('node is on busy calling ', data);
            });
            socket.on('onAcceptFromSaleperson', (data: any) => {
                io.sockets.emit('onAcceptFromSaleperson', { data: data, id: socket.id });
                console.log('onAcceptFromSaleperson .. ', data);
            });
            socket.on('closeVideoCallFromSalesperson', (data: any) => {
                io.sockets.emit('closeVideoCallFromSalesperson', { data: data, id: socket.id });
                console.log('closeVideoCallFromSalesperson .. ', data);
            });
            socket.on('closeVideoCallFromTablet', (data: any) => {
                io.sockets.emit('closeVideoCallFromTablet', { data: data, id: socket.id });
                console.log('closeVideoCallFromTablet .. ', data);
            });
            socket.on('onTaken', (data: any) => {
                io.sockets.emit('onTaken', { data: data, id: socket.id });
                console.log('onTaken .. ', data);
            });
            socket.on('disconnect', function () {
                console.log(socket.id + ': disconnected');
            });
        })
    }
}
export default App
