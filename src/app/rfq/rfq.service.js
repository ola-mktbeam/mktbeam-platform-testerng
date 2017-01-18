"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var RFQ = (function () {
    function RFQ() {
    }
    return RFQ;
}());
exports.RFQ = RFQ;
var RFQService = (function () {
    /**
     *
     */
    //   constructor(@Inject(Http) _http:Http) {
    function RFQService(_backendService) {
        var _this = this;
        this._rfqs = new BehaviorSubject_1.BehaviorSubject([]);
        this.backendService = _backendService;
        this.backendService.onMessage(function (data) {
            if (data.message === "rfq.RFQCreatedEvt") {
                var rfqs = _this._rfqs.getValue();
                rfqs.push(data.rfq);
                _this._rfqs.next(rfqs);
            }
            if (data.message === "rfq.RFQUpdatedEvt" || data.message === "RFQMessageThreadUpdatedEvt" || data.message === "RFQMessageThreadCreatedEvt") {
                var rfqs = _this._rfqs.getValue();
                rfqs = _this.replaceRFQ(rfqs, data.rfq);
                _this._rfqs.next(rfqs);
            }
            if (data.message === "rfq.RFQDeletedEvt") {
                var rfqs = _this._rfqs.getValue();
                rfqs = _this.removeRFQ(rfqs, data.rfq);
                _this._rfqs.next(rfqs);
            }
        });
    }
    Object.defineProperty(RFQService.prototype, "rfqs", {
        get: function () {
            return this._rfqs.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    RFQService.prototype.setCurrentRFQ = function (rfq) {
        console.log("Setting current rfq to ", rfq);
        this.currentRFQ = rfq;
        console.log("Rfq service this is", this);
    };
    RFQService.prototype.getCurrentRFQ = function () {
        return this.currentRFQ;
    };
    RFQService.prototype.loadRFQ = function (rfqId) {
        var retSubj = new BehaviorSubject_1.BehaviorSubject(new Object());
        console.log("I load rfq");
        this.backendService.getRESTResource("/api/rfqs/all/" + rfqId).subscribe(function (res) {
            console.log("Got responseeewewewe", res);
            // let subscriptions = (<Object[]>res.json()).map((channel: any) =>
            ///   new Channel({id:channel.id, name:channel.name,description:channel.description}));
            retSubj.next(res);
        }, function (err) {
            console.error("Error loading beam", err);
            retSubj.error(err);
        });
        return retSubj.asObservable();
    };
    /**
     *
     */
    RFQService.prototype.loadInitialRFQs = function () {
        var _this = this;
        this.backendService.getRESTResource("/api/rfqs/all").subscribe(function (res) {
            console.log("Got response", res);
            // let subscriptions = (<Object[]>res.json()).map((channel: any) =>
            ///   new Channel({id:channel.id, name:channel.name,description:channel.description}));
            _this._rfqs.next(res.items);
        }, function (err) { return console.log("Error retrieving rfqs...."); });
    };
    /***
     *
     * @param rfqs
     * @param rfq
     * @returns {any[]}
     */
    RFQService.prototype.removeRFQ = function (rfqs, rfq) {
        var idx = 0;
        var foundIdx = undefined;
        for (var _i = 0, rfqs_1 = rfqs; _i < rfqs_1.length; _i++) {
            var r = rfqs_1[_i];
            if (r.id === rfq.id) {
                foundIdx = idx;
            }
            idx++;
        }
        console.log("Found to remove at idx " + foundIdx);
        if (foundIdx != undefined) {
            rfqs.splice(foundIdx, 1);
        }
        return rfqs;
    };
    /**
     *
     * @param subs
     * @param sub
     * @returns {ChannelSubscription[]}
     */
    RFQService.prototype.replaceRFQ = function (rfqs, rfq) {
        var idx = 0;
        for (var _i = 0, rfqs_2 = rfqs; _i < rfqs_2.length; _i++) {
            var r = rfqs_2[_i];
            if (r.id === rfq.id) {
                rfqs[idx] = rfq;
            }
            idx++;
        }
        return rfqs;
    };
    /*
    /**
     *
     * @param name
     * @returns {Observable<any>}
     */
    RFQService.prototype.createRFQ = function (query) {
        var cmd = new Object();
        cmd.message = "rfq.StructureQueryCmd";
        cmd.query = query;
        var obs = this.backendService.sendCommandSync(cmd);
        return obs;
    };
    RFQService.prototype.updateRFQ = function (rfqId, query) {
        var cmd = new Object();
        cmd.message = "rfq.StructureQueryCmd";
        cmd.rfqId = rfqId;
        cmd.query = query;
        var obs = this.backendService.sendCommandSync(cmd);
        return obs;
    };
    RFQService = __decorate([
        core_1.Injectable()
    ], RFQService);
    return RFQService;
}());
exports.RFQService = RFQService;
//# sourceMappingURL=rfq.service.js.map