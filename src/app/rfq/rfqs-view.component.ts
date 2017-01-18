import {Component} from  '@angular/core';

import { RouterModule, Router} from '@angular/router';



import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs/Observable";

import {RFQService} from "./rfq.service";
import {RFQListComponent} from "./rfq-list.component";
import {_finally} from "rxjs/operator/finally";



@Component({
    selector: 'rfqs-view',
    templateUrl:'./rfqs-view-component.html',

})
export class RfqsViewComponent{



    rfqService:RFQService;

    rfqs:any;
   constructor(private _rfqService: RFQService,private authService:AuthService) {

       this.rfqService=_rfqService;
       this.rfqs=_rfqService.rfqs;
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



    newRFQ(query:string){

        this.rfqService.createRFQ(query);

    }

    updateRFQ(rfqId:string, query:string){

        if( this.rfqService.currentRFQ!=undefined) {
            this.rfqService.updateRFQ( this.rfqService.currentRFQ.id, query);
        }
    }



    ngOnInit() {

        this.authService.checkCredentials();

        this.rfqService.loadInitialRFQs();


    }




}

