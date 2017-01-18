"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var router_1 = require('@angular/router');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var common_1 = require("./common/common");
var app_component_1 = require('./app.component');
var login_view_component_1 = require("./auth/login-view.component");
var rfqs_view_component_1 = require("./rfq/rfqs-view.component");
var rfq_detail_view_component_1 = require("./rfq/rfq-detail-view.component");
var rfq_list_component_1 = require("./rfq/rfq-list.component");
var rfq_list_item_component_1 = require("./rfq/rfq-list-item.component");
var message_thread_1 = require("./message/message-thread");
var thread_message_1 = require("./message/thread-message");
var rfq_service_1 = require("./rfq/rfq.service");
var backend_service_1 = require("./common/backend.service");
var token_service_1 = require("./auth/token.service");
var auth_service_1 = require("./auth/auth.service");
var message_service_1 = require("./message/message.service");
var log_component_1 = require("./common/log.component");
var log_item_component_1 = require("./common/log-item.component");
var RFQResolver = (function () {
    function RFQResolver(rfqService) {
        this.rfqService = rfqService;
    }
    RFQResolver.prototype.resolve = function (route, state) {
        return this.rfqService.loadRFQ(route.params['id']);
    };
    RFQResolver = __decorate([
        core_1.Injectable()
    ], RFQResolver);
    return RFQResolver;
}());
exports.RFQResolver = RFQResolver;
var appRoutes = [
    { path: 'login', component: login_view_component_1.LoginViewComponent },
    { path: '', component: login_view_component_1.LoginViewComponent },
    { path: 'rfqs/:id', component: rfq_detail_view_component_1.RfqDetailViewComponent
    },
    { path: 'rfqs', component: rfqs_view_component_1.RfqsViewComponent },
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, router_1.RouterModule.forRoot(appRoutes)],
            declarations: [app_component_1.AppComponent, common_1.NameValuePipe, login_view_component_1.LoginViewComponent, rfqs_view_component_1.RfqsViewComponent, rfq_detail_view_component_1.RfqDetailViewComponent, rfq_list_component_1.RFQListComponent, rfq_list_item_component_1.RFQListItemComponent, message_thread_1.MessageThreadComponent, thread_message_1.ThreadMessageComponent, log_component_1.LogComponent, log_item_component_1.LogItemComponent],
            bootstrap: [app_component_1.AppComponent],
            providers: [RFQResolver, rfq_service_1.RFQService, backend_service_1.BackendService, token_service_1.TokenService, auth_service_1.AuthService, message_service_1.MessageService
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map