import {Component} from  '@angular/core';

import { RouterModule, Router,ActivatedRoute} from '@angular/router';



import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs/Observable";

import {RFQService} from "./rfq.service";
import {MessageService} from "../message/message.service";



@Component({
    selector: 'rfq-detail-view',
    templateUrl:'./rfq-detail-view-component.html',



})
export class RfqDetailViewComponent{


   constructor(
       private rfqService: RFQService,private authService:AuthService, private route:ActivatedRoute, private router:Router, private messageService:MessageService) {

       console.log("rfqService is ",rfqService);

       this.rfq = rfqService.getCurrentRFQ();


       console.log("This rfq is now ",this.rfq);


       var initThreads=[];
       for(var i=0;i<this.rfq.messageThreads.length;i++)
       {
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

    //newsDeskService:NewsdeskService;


    errorText:String;

    //selectedChannel:Channel=new Channel();
   // channels: Observable<Channel[]>;


    rfq:any;

    localMessageThread:any=new Object();

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
    ngOnInit() {

        this.authService.checkCredentials();






    }




}

