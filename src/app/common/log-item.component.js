"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var LogItemComponent = (function () {
    function LogItemComponent() {
    }
    LogItemComponent = __decorate([
        core_1.Component({
            selector: 'log-item',
            inputs: ['logitem'],
            template: "                 \n             <div>\n                 <div *ngIf=\"!logitem.expanded\" class=\"log-item\">\n                      {{logitem.created | date: 'ddMMyyyyHHmmss'}} - {{logitem.text}}:{{logitem.message.message}}<button class=\"btn btn-xs\" href=\"#\" (click)=\"logitem.expanded=!logitem.expanded\">+</button>\n                 </div>\n                 <div *ngIf=\"logitem.expanded\" class=\"log-item\">\n                      {{logitem.created | date: 'ddMMyyyyHHmmss'}} - {{logitem.text}}:{{logitem.message.message}}<button class=\"btn btn-xs\" href=\"#\" (click)=\"logitem.expanded=!logitem.expanded\">-</button>\n                        <pre>{{logitem.message|json}}</pre>                            \n                 \n                 </div>\n                 \n               \n                 \n               \n                 </div>\n             \n             \n             \n        "
        })
    ], LogItemComponent);
    return LogItemComponent;
}());
exports.LogItemComponent = LogItemComponent;
//# sourceMappingURL=log-item.component.js.map