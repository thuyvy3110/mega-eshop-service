"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var cors_1 = tslib_1.__importDefault(require("cors"));
var helmet_1 = tslib_1.__importDefault(require("helmet"));
var morgan_1 = tslib_1.__importDefault(require("morgan"));
var express = require('express');
var fileUpload = require('express-fileupload');
var options = {
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
};
var App = (function () {
    function App(appInit) {
        this.app = express();
        this.app.use(helmet_1.default());
        this.app.use(cors_1.default(options));
        this.app.use(morgan_1.default('dev'));
        this.app.use(fileUpload({
            createParentPath: true,
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }));
        this.port = appInit.port;
        this.middlewares(appInit.middleWares);
        this.app.use(cors_1.default());
        this.app.options('*', cors_1.default());
        this.routes(appInit.controllers);
    }
    App.prototype.middlewares = function (middleWares) {
        var _this = this;
        middleWares.forEach(function (middleWare) {
            _this.app.use(middleWare);
        });
    };
    App.prototype.routes = function (controllers) {
        var _this = this;
        controllers.forEach(function (controller) {
            _this.app.use('/', controller.router);
        });
    };
    App.prototype.listen = function () {
        var _this = this;
        var http = require('http').Server(this.app);
        var io = require('socket.io')(http);
        http.listen(this.port, function () {
            console.log(_this.port + ": [SUCCES] Express app is running!");
        });
        io.on('connection', function (socket) {
            console.log(socket.id + ': connected');
            socket.emit('id', socket.id);
            socket.on('joinKVSRom', function (data) {
                io.sockets.emit('joinKVSRom', { data: data, id: socket.id });
                io.sockets.emit('pressNode', { data: data, id: socket.id });
                console.log('joinKVSRom socket hearing  .. ', data);
            });
            socket.on('sendMasterNotify', function (data) {
                io.sockets.emit('sendMasterNotify', {
                    data: data,
                    id: socket.id
                });
                console.log('sendMasterNotify socket hearing ', data);
            });
            socket.on('salespersonMakeCalling', function (data) {
                io.sockets.emit('salespersonMakeCalling', { data: data, id: socket.id });
                console.log('salespersonMakeCalling .... ', data);
            });
            socket.on('startCallingFromSalesPerson', function (data) {
                io.sockets.emit('startCallingFromSalesPerson', { data: data, id: socket.id });
                console.log('startCallingFromSalesPerson .... ', data);
            });
            socket.on('pressNode', function (data) {
                io.sockets.emit('pressNode', { data: data, id: socket.id });
                console.log('user press on a node ', data);
            });
            socket.on('onLineBusy', function (data) {
                io.sockets.emit('onLineBusy', { data: data, id: socket.id });
                console.log('node is on busy calling ', data);
            });
            socket.on('onAcceptFromSaleperson', function (data) {
                io.sockets.emit('onAcceptFromSaleperson', { data: data, id: socket.id });
                console.log('onAcceptFromSaleperson .. ', data);
            });
            socket.on('disconnect', function () {
                console.log(socket.id + ': disconnected');
            });
        });
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=app.js.map