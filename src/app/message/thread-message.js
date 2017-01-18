"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var rfq_service_1 = require("./../rfq/rfq.service");
var auth_service_1 = require("../auth/auth.service");
var backend_service_1 = require("../common/backend.service");
var ThreadMessageComponent = (function () {
    function ThreadMessageComponent(messageService, authService) {
        this.messageService = messageService;
        this.authService = authService;
        this.currentUserId = authService.getLoggedInUser().id;
    }
    ThreadMessageComponent = __decorate([
        core_1.Component({
            selector: 'thread-message',
            inputs: ['message'],
            providers: [
                backend_service_1.BackendService,
                auth_service_1.AuthService,
                rfq_service_1.RFQService
            ],
            template: "      \n                 <div [ngClass]=\"{'thread-message-body-wrapper-received': currentUserId!=message.userId, 'thread-message-body-wrapper-sent': currentUserId==message.userId}\" >\n                 \n                    <div class=\"thread-message-header\">\n                       [{{message.posted}}]{{message.userName}} <span *ngIf=\"currentUserId==message.userId\">(Me!)</span> wrote: \n                    </div>\n                    <div [ngClass]=\"{'thread-message-body-received': currentUserId!=message.userId, 'thread-message-body-sent': currentUserId==message.userId}\">\n                        {{message.body}}              \n                    </div>\n                </div> \n\n        "
        })
    ], ThreadMessageComponent);
    return ThreadMessageComponent;
}());
exports.ThreadMessageComponent = ThreadMessageComponent;
//# sourceMappingURL=thread-message.js.map