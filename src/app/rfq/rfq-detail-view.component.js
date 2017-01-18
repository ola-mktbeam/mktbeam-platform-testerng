"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var RfqDetailViewComponent = (function () {
    function RfqDetailViewComponent(rfqService, authService, route, router, messageService) {
        this.rfqService = rfqService;
        this.authService = authService;
        this.route = route;
        this.router = router;
        this.messageService = messageService;
        this.localMessageThread = new Object();
        console.log("rfqService is ", rfqService);
        this.rfq = rfqService.getCurrentRFQ();
        console.log("This rfq is now ", this.rfq);
        var initThreads = [];
        for (var i = 0; i < this.rfq.messageThreads.length; i++) {
            initThreads.push(this.rfq.messageThreads[i].threadId);
        }
        messageService.initThreads(initThreads);
        messageService.loadInitialMessages(initThreads);
        /*
               this.rfqObservable.subscribe(
    
                   res=> {
                       console.log("In loadrfq promise, got res",res);
    
                       if(res.items==undefined)
                       {
                           console.log("Wtf, why emtpy...")
                       }else{
    
                           this.rfq = res.items[0];
                           console.log("Setting component rfq to ",this.rfq);
    
                           this.localMessageThread=this.rfq.messageThreads[0];
    
    
    
    
                           messageService.initThreads([this.rfq.messageThreads[0].threadId]);
    
    
    
                           messageService.loadInitialMessages([this.rfq.messageThreads[0].threadId]);
    
    
    
    
    
    
                       }
    
    
                   },
    
                           err=>{
                                console.log("An error occurred when loading a rfq...",err);
                               this.errorText = "Failed loading beam...";
    
    
                   }
               );
    
           });
    */
        //     this.beam=new Beam();
        // this.channels=newsdeskService.channels;
    }
    // beam:Beam;
    // channel:Channel;
    ///////////////////////77
    //
    ///////////////////////////////////////77
    /*
    save(){

        this.channelsService.updateBeam(this.beam).subscribe(
            updatedBeam=> {
                this.router.navigateByUrl('/channels/'+this.channel.id);
            },err=>
            {
                console.log("err",err)
               this.errorText="An eorror occurred...";
            })
        
        
    }

    publish(){
        console.log("publishing to cahnnel "+this.channel.id);

        this.channelsService.publishBeam(this.beam.id,this.channel.id).subscribe(
            updatedBeam=> {
                this.router.navigateByUrl('/channels/'+this.channel.id);
            },err=>
            {
                console.log("err",err)
                this.errorText="Could not save the channel ("+err+")";
            })


    }

    complete(){

        this.channelsService.completeBeam(this.beam.id).subscribe(
            completedBeam=> {
                this.router.navigateByUrl('/channels/'+this.channel.id);
            },err=>
            {
                console.log("err",err)
                this.errorText="Could not save the channel ("+err+")";
            })


    }

    rekove(){

  //      this.channelsService.revokeBeam(this.beam.id).subscribe(
    //        completedBeam=> {
      //          this.router.navigateByUrl('/channels/'+this.channel.id);
        //    },err=>
          ////    console.log("err",err)
             //   this.errorText="Could not save the channel ("+err+")";
           // })


    }
*/
    RfqDetailViewComponent.prototype.ngOnInit = function () {
        this.authService.checkCredentials();
    };
    RfqDetailViewComponent = __decorate([
        core_1.Component({
            selector: 'rfq-detail-view',
            templateUrl: './app/rfq/rfq-detail-view-component.html'
        })
    ], RfqDetailViewComponent);
    return RfqDetailViewComponent;
}());
exports.RfqDetailViewComponent = RfqDetailViewComponent;
//# sourceMappingURL=rfq-detail-view.component.js.map