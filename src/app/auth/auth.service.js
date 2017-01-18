"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Subject_1 = require("rxjs/Subject");
var AuthService = (function () {
    //    private loginState:Observable<any>;
    function AuthService(_router, _tokenService, _backendService, route) {
        var _this = this;
        this._router = _router;
        this._backendService = _backendService;
        this.route = route;
        this.isAuthenticating = false;
        this.authenticationFailed = false;
        this.router = _router;
        this.loginState$ = new Subject_1.Subject();
        this.tokenService = _tokenService;
        _backendService.onMessage(function (data) {
            if (data.message === "common.AuthenticatedEvt") {
                var userJson = JSON.stringify(data.user);
                _this.tokenService.setToken(data.issuedToken);
                _this.tokenService.setUser(data.user);
                _this.loginState$.next(data.message);
            }
            if (data.message === "common.AuthenticationFailedEvt") {
                _this.loginState$.next(data.message);
            }
        });
    }
    AuthService.prototype.logout = function () {
        //        localStorage.removeItem("token");
        //      localStorage.removeItem("user");
        this.tokenService.setToken(null);
        this.tokenService.setUser(null);
        this._router.navigate(['LoginView']);
    };
    AuthService.prototype.login = function (username, password) {
        var cmd = new Object();
        cmd.message = "common.AuthenticateCmd";
        cmd.username = username;
        cmd.password = password;
        this._backendService.sendCommand(cmd);
        return this.loginState$;
    };
    AuthService.prototype.authenticationInProgress = function () {
        return this.isAuthenticating;
    };
    AuthService.prototype.lastAuthenticationFailed = function () {
        return this.authenticationFailed;
    };
    AuthService.prototype.isAuthenticated = function () {
        //        if (localStorage.getItem("token")===null){
        if (this.tokenService.getToken() === undefined) {
            return false;
        }
        return true;
    };
    AuthService.prototype.getLoggedInUser = function () {
        //    return JSON.parse(localStorage.getItem("user"));
        return this.tokenService.getUser();
    };
    AuthService.prototype.getToken = function () {
        return this.tokenService.getToken();
    };
    AuthService.prototype.checkCredentials = function () {
        //   if (localStorage.getItem("token")===null)
        console.log("checkcredentials");
        var token = this.tokenService.getToken();
        if (this.tokenService.getToken() === undefined) {
            console.log("navigatingggg...");
            this.router.navigateByUrl("/login");
        }
    };
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map