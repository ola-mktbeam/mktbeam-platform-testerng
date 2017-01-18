"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var TokenService = (function () {
    function TokenService() {
    }
    TokenService.prototype.getUser = function () {
        //    return JSON.parse(localStorage.getItem("user"));
        return this.user;
    };
    TokenService.prototype.getToken = function () {
        console.log("get token:" + this.token);
        return this.token;
    };
    TokenService.prototype.setToken = function (token) {
        console.log("Set token:" + token);
        this.token = token;
    };
    TokenService.prototype.setUser = function (user) {
        this.user = user;
    };
    TokenService = __decorate([
        core_1.Injectable()
    ], TokenService);
    return TokenService;
}());
exports.TokenService = TokenService;
//# sourceMappingURL=token.service.js.map