"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var API = (function () {
    function API(name, url) {
        this.name = name;
        this.url = url;
    }
    return API;
}());
exports.API = API;
var AppComponent = (function () {
    function AppComponent(_authService, _backendService) {
        this.authService = _authService;
        this.backendService = _backendService;
        this.apis = new Array();
        this.apis.push(new API("Latest", "http://52.59.95.154:8080"));
        this.apis.push(new API("Localhost", "http://127.0.0.1:8080"));
        this.currentAPI = this.apis[0];
        console.log("I app component constructor");
        this.backendService.onOpen(function (e) {
            console.log("backnedService:onOpen", e);
        });
        this.backendService.onMessage(function (data) {
            //      console.log("backnedService:onMessage",data);
        });
        this.backendService.onClose(function (data) {
            console.log("backnedService:onClose", data);
        });
        this.backendService.open();
    }
    AppComponent.prototype.ngOnInit = function () {
        console.log("App component onIniiit");
        this.authService.checkCredentials();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'platformtester-app',
            templateUrl: './app/app.component.html'
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map