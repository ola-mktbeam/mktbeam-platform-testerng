"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var RFQListComponent = (function () {
    function RFQListComponent() {
    }
    RFQListComponent = __decorate([
        core_1.Component({
            selector: 'rfq-list',
            inputs: ['rfqs'],
            template: "                 \n             <div   *ngFor=\"let r of rfqs|async\">\n               <rfq-list-item [rfq]=\"r\"> </rfq-list-item>              \n             </div>\n        "
        })
    ], RFQListComponent);
    return RFQListComponent;
}());
exports.RFQListComponent = RFQListComponent;
//# sourceMappingURL=rfq-list.component.js.map