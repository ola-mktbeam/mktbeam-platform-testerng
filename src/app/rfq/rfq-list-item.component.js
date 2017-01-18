"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var RFQListItemComponent = (function () {
    // private publishedBeam;
    function RFQListItemComponent(rfqService, router) {
        this.rfqService = rfqService;
        this.router = router;
    }
    RFQListItemComponent.prototype.selectRFQ = function (rfq) {
        this.rfqService.setCurrentRFQ(rfq);
    };
    RFQListItemComponent.prototype.viewDetails = function (rfq) {
        this.rfqService.setCurrentRFQ(rfq);
        this.router.navigateByUrl('/rfqs/' + rfq.id);
    };
    RFQListItemComponent.prototype.ngOnInit = function () {
    };
    RFQListItemComponent = __decorate([
        core_1.Component({
            selector: 'rfq-list-item',
            inputs: ['rfq'],
            template: "        \n        <div class=\"rfq-list-item\" (click)=\"selectRFQ(rfq)\">\n           <span *ngIf=\"rfq===rfqService.currentRFQ\">Active!</span>\n           \n            <div><b>Id:</b>{{rfq.id}} - <b>Seqno:</b>{{rfq.seqno}}</div>            \n            <div><b>State:</b>{{rfq.state}}</div>\n            <button class=\"btn btn-xs\" (click)=\"viewDetails(rfq)\">Expand</button>\n             <hr>\n              <div class=\"beam-list-item-text\">\n                 <small><div  [innerHTML]=\"rfq.structureJson\"></div></small>              \n            </div>\n           \n        </div>\n            \n        "
        })
    ], RFQListItemComponent);
    return RFQListItemComponent;
}());
exports.RFQListItemComponent = RFQListItemComponent;
//# sourceMappingURL=rfq-list-item.component.js.map