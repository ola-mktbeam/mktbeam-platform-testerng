"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var MessageService = (function () {
    /**
     *
     */
    //   constructor(@Inject(Http) _http:Http) {
    function MessageService(_backendService) {
        var _this = this;
        ///  private _localThreadMessages:BehaviorSubject<any[]> = new BehaviorSubject([]);
        this._threadSubjects = {};
        this.backendService = _backendService;
        this.backendService.onMessage(function (data) {
            if (data.message === "message.MessagePostedEvt") {
                //        var msgs=this._localThreadMessages.getValue();
                var threadId = data.postedMessage.threadId;
                console.log("A message was posted to thread " + threadId);
                var msgs = _this._threadSubjects[threadId].getValue();
                _this.addMessageIfNew(msgs, data.postedMessage);
                _this._threadSubjects[threadId].next(msgs);
            }
        });
    }
    //   get localThreadMessages() {
    //     return this._localThreadMessages.asObservable();
    // }
    MessageService.prototype.threadMessagesAsObservable = function (threadId) {
        console.log("Trying to get subject as osbervable for id " + threadId, this._threadSubjects);
        if (this._threadSubjects[threadId] == undefined) {
            this._threadSubjects[threadId] = new BehaviorSubject_1.BehaviorSubject([]);
        }
        return this._threadSubjects[threadId].asObservable();
    };
    MessageService.prototype.initThreads = function (threadIds) {
        this._threadSubjects = {};
    };
    /**
     *
     */
    MessageService.prototype.loadInitialMessages = function (threadIds) {
        var _this = this;
        var _loop_1 = function(threadId) {
            if (this_1._threadSubjects[threadId] == undefined) {
                this_1._threadSubjects[threadId] = new BehaviorSubject_1.BehaviorSubject([]);
            }
            this_1.backendService.getRESTResource("/api/message/threads/" + threadId + "/messages").subscribe(function (res) {
                console.log("Got response", res);
                // let subscriptions = (<Object[]>res.json()).map((channel: any) =>
                ///   new Channel({id:channel.id, name:channel.name,description:channel.description}));
                var threadSubj = _this._threadSubjects[threadId];
                threadSubj.next(res.items);
                console.log("Loaded data for subject id " + threadId, _this._threadSubjects);
            }, function (err) { return console.log("Error retrieving messages for thread ...." + threadId); });
        };
        var this_1 = this;
        for (var _i = 0, threadIds_1 = threadIds; _i < threadIds_1.length; _i++) {
            var threadId = threadIds_1[_i];
            _loop_1(threadId);
        }
    };
    /***
     *
     * @param rfqs
     * @param rfq
     * @returns {any[]}
     */
    MessageService.prototype.removeMessage = function (messages, message) {
        var idx = 0;
        var foundIdx = undefined;
        for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
            var m = messages_1[_i];
            if (m.id === message.id) {
                foundIdx = idx;
            }
            idx++;
        }
        if (foundIdx != undefined) {
            messages.splice(foundIdx, 1);
        }
        return messages;
    };
    /**
     *
     * @param subs
     * @param sub
     * @returns {ChannelSubscription[]}
     */
    MessageService.prototype.replaceMessage = function (messages, message) {
        var idx = 0;
        for (var _i = 0, messages_2 = messages; _i < messages_2.length; _i++) {
            var m = messages_2[_i];
            if (m.id === message.id) {
                messages[idx] = message;
            }
            idx++;
        }
        return messages;
    };
    MessageService.prototype.addMessageIfNew = function (messages, message) {
        var idx = 0;
        for (var _i = 0, messages_3 = messages; _i < messages_3.length; _i++) {
            var m = messages_3[_i];
            if (m.id === message.id) {
                return;
            }
            idx++;
        }
        messages.push(message);
        return messages;
    };
    MessageService.prototype.postMessage = function (threadId, msg) {
        var cmd = new Object();
        cmd.message = "message.CreateAndPostMessageCmd";
        cmd.threadId = threadId;
        cmd.body = msg;
        var obs = this.backendService.sendCommandSync(cmd);
        return obs;
    };
    MessageService = __decorate([
        core_1.Injectable()
    ], MessageService);
    return MessageService;
}());
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map