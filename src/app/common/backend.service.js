"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var UUID_1 = require("./UUID");
var Subject_1 = require("rxjs/Subject");
var Rx_1 = require("rxjs/Rx");
var ServiceError = (function () {
    function ServiceError() {
    }
    return ServiceError;
}());
exports.ServiceError = ServiceError;
var LogItem = (function () {
    function LogItem() {
        this.expanded = false;
    }
    return LogItem;
}());
exports.LogItem = LogItem;
var BackendService = (function () {
    function BackendService(_http, _tokenService) {
        this._logitems = new Rx_1.BehaviorSubject([]);
        this._errors = new Rx_1.BehaviorSubject([]);
        //private serverRoot:string="http://localhost:8080"
        this.serverRoot = "http://52.59.95.154:8080";
        this.URL = this.serverRoot + "/api/async";
        this.handlers = {};
        this.syncCommands = [];
        this._opened = false;
        this.http = _http;
        this.tokenService = _tokenService;
    }
    Object.defineProperty(BackendService.prototype, "logitems", {
        get: function () {
            return this._logitems.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BackendService.prototype, "errors", {
        get: function () {
            return this._errors.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    BackendService.prototype.open = function () {
        var _this = this;
        if (!this._opened) {
            this.sock = new SockJS(this.URL);
            this.sock.onopen = function (e) {
                _this.callHandlers('open', e);
            };
            this.sock.onmessage = function (e) {
                _this.messageReceived(e);
            };
            this.sock.onclose = function (e) {
                _this.callHandlers('close', e);
            };
            this._opened = true;
        }
    };
    BackendService.prototype.isOpen = function () {
        return this._opened;
    };
    BackendService.prototype.close = function () {
        if (this._opened) {
            this.sock.close();
            delete this.sock;
            this._opened = false;
        }
    };
    BackendService.prototype.addLogMessage = function (text, msg) {
        var li = this._logitems.getValue();
        var i = new LogItem();
        i.created = new Date();
        i.text = text;
        i.message = msg;
        li.push(i);
        this._logitems.next(li);
    };
    BackendService.prototype.messageReceived = function (e) {
        var msg = JSON.parse(e.data);
        this.addLogMessage("Received:", msg);
        //Save errors....
        if (msg.message === "common.ServiceErrorEvt") {
            console.log("ERRROR...");
            var errors = this._errors.getValue();
            if (errors.length >= 3)
                errors.shift();
            var err = new ServiceError();
            err.reason = msg.reason;
            err.created = msg.created;
            errors.push(err);
        }
        //  console.log("Received event from server",msg);
        if (this.currentSyncCommand != undefined && this.currentSyncCommand.id === msg.id) {
            //console.log("This event is related to a current sync command, try to notify observers..wwww..",msg);
            this.syncCommandSubject.next(msg);
        }
        this.callHandlers('message', msg);
    };
    BackendService.prototype.callHandlers = function (type, data) {
        if (this.handlers[type]) {
            this.handlers[type].forEach(function (cb) {
                cb.apply(cb, [data]);
            });
        }
    };
    BackendService.prototype.addEvent = function (type, callback) {
        if (!this.handlers[type])
            this.handlers[type] = [];
        this.handlers[type].push(callback);
    };
    BackendService.prototype.onOpen = function (callback) {
        console.log("sockjs open");
        this.addEvent('open', callback);
    };
    BackendService.prototype.onMessage = function (callback) {
        this.addEvent('message', callback);
    };
    BackendService.prototype.onClose = function (callback) {
        this.addEvent('close', callback);
    };
    BackendService.prototype.sendCommand = function (cmd) {
        if (this._opened) {
            var uuid = UUID_1.UUID.newUUID();
            cmd.id = uuid;
            var token = localStorage.getItem("token");
            cmd.token = token;
            console.log("sending", cmd);
            var msgJson = JSON.stringify(cmd);
            this.sock.send(msgJson);
            this.addLogMessage("Sent:", cmd);
        }
    };
    BackendService.prototype.sendCommandSync = function (cmd) {
        if (this._opened) {
            var uuid = UUID_1.UUID.newUUID();
            cmd.id = uuid;
            var token = this.tokenService.getToken();
            cmd.token = token;
            console.log("sending", cmd);
            var msgJson = JSON.stringify(cmd);
            this.currentSyncCommand = cmd;
            this.sock.send(msgJson);
            this.addLogMessage("Sent:(SYNC)", cmd);
            this.syncCommandSubject = new Subject_1.Subject();
            return this.syncCommandSubject;
        }
    };
    BackendService.prototype.getRESTResource = function (url) {
        var token = this.tokenService.getToken();
        var headers = new http_1.Headers();
        headers.append('Authorization', token);
        //     console.log("Appeding token:; "+token);
        return this.http.get(this.serverRoot + url, { headers: headers });
        //  .map(response => response.json());
    };
    BackendService = __decorate([
        core_1.Injectable()
    ], BackendService);
    return BackendService;
}());
exports.BackendService = BackendService;
//# sourceMappingURL=backend.service.js.map