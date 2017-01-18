"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Observable_1 = require("rxjs/Observable");
var MessageThreadComponent = (function () {
    //  messages:Observable<any[]>;
    function MessageThreadComponent(messageService) {
        this.messageService = messageService;
        this.thread = new Object();
    }
    MessageThreadComponent.prototype.postMessage = function (msg) {
        //   this.messageService.postMessage2(this.thread.threadId,msg);
        var _this = this;
        this.messageService.postMessage(this.thread.threadId, msg).subscribe(function (messagePosted) {
            console.log("message posted ok");
            //    this.scrollToBottom();
        }, function (err) {
            console.log("err", err);
            _this.errorText = "Could not post message... (" + err + ")";
        });
    };
    MessageThreadComponent.prototype.scrollToBottom = function () {
        var _this = this;
        var timer = Observable_1.Observable.timer(100);
        timer.subscribe(function (t) { return _this.myScrollContainer.nativeElement.scrollTop = _this.myScrollContainer.nativeElement.scrollHeight; });
        ///     this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight
    };
    MessageThreadComponent.prototype.ngAfterViewInit = function () {
        //  this.initTimer=  Observable.timer(1000,1000);
        var _this = this;
        //    this.initTimer.subscribe(this.tryToInitThread(this.thread));
        console.log("thread is ", this.thread);
        this.messages = this.messageService.threadMessagesAsObservable(this.thread.threadId);
        this.messageService._threadSubjects[this.thread.threadId].subscribe(function (changed) {
            _this.scrollToBottom();
        });
        //     this.scrollToBottom();
    };
    MessageThreadComponent.prototype.tryToInitThread = function (thread) {
        console.log("Waiting to init thread,,", thread);
        //this.messages=this.messageService.threadMessagesAsObservable(this.thread.id);
    };
    __decorate([
        core_1.Input()
    ], MessageThreadComponent.prototype, "thread");
    __decorate([
        core_1.ViewChild('scrollMe')
    ], MessageThreadComponent.prototype, "myScrollContainer");
    MessageThreadComponent = __decorate([
        core_1.Component({
            selector: 'message-thread',
            template: "          \n                 <div class=\"message-thread\">\n                 <h4>Thread name:{{thread.name}}</h4>\n                  <h5>Thread id:{{thread.threadId}}</h5>\n                 <b>Members:</b><span *ngFor=\"let m of thread.members\">{{m.name}}, </span>\n                    <div #scrollMe class=\"message-thread-messages\">\n                        <div   *ngFor=\"let m of messages|async\">\n                            <thread-message [message]=\"m\" >  </thread-message>              \n                        </div>\n                 \n                    </div>\n   \n                <input class=\"form-control\" #message placeholder=\"Type message and press enter...\"  (keyup.enter)=\"postMessage(message.value);message.value=''\"/>\n                </div>\n        "
        })
    ], MessageThreadComponent);
    return MessageThreadComponent;
}());
exports.MessageThreadComponent = MessageThreadComponent;
//# sourceMappingURL=message-thread.js.map