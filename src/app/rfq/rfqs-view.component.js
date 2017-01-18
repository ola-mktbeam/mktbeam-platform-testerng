"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var RfqsViewComponent = (function () {
    function RfqsViewComponent(_rfqService, authService) {
        this._rfqService = _rfqService;
        this.authService = authService;
        this.rfqService = _rfqService;
        this.rfqs = _rfqService.rfqs;
        //     this.beam=new Beam();
        // this.channels=newsdeskService.channels;
    }
    //newsDeskService:NewsdeskService;
    //   errorText:string;
    //  selectedChannel:Channel=new Channel();
    // channels: Observable<Channel[]>;
    // beam:Beam;
    // channel:Channel;
    ///////////////////////77
    //
    ///////////////////////////////////////77
    RfqsViewComponent.prototype.newRFQ = function (query) {
        this.rfqService.createRFQ(query);
    };
    RfqsViewComponent.prototype.updateRFQ = function (rfqId, query) {
        if (this.rfqService.currentRFQ != undefined) {
            this.rfqService.updateRFQ(this.rfqService.currentRFQ.id, query);
        }
    };
    RfqsViewComponent.prototype.ngOnInit = function () {
        this.authService.checkCredentials();
        this.rfqService.loadInitialRFQs();
    };
    RfqsViewComponent = __decorate([
        core_1.Component({
            selector: 'rfqs-view',
            templateUrl: './app/rfq/rfqs-view-component.html'
        })
    ], RfqsViewComponent);
    return RfqsViewComponent;
}());
exports.RfqsViewComponent = RfqsViewComponent;
//# sourceMappingURL=rfqs-view.component.js.map