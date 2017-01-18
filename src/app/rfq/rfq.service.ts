
import {Injectable, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from "@angular/http";


import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Subject} from "rxjs/Subject";

import {BackendService} from "../common/backend.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";





export class RFQ {
    id:string;
    title: string;
     text: string;
    state:string;

 

    constructor(){

    
    }
}




@Injectable()
export class RFQService {

    private _rfqs:BehaviorSubject<any[]> = new BehaviorSubject([]);

    public currentRFQ:any;

    http:Http;
    backendService:BackendService;


    get rfqs() {

        return this._rfqs.asObservable();
    }

    setCurrentRFQ(rfq:any)
    {
        console.log("Setting current rfq to ",rfq);


        this.currentRFQ=rfq;
        console.log("Rfq service this is",this);

    }
    getCurrentRFQ()
    {
        return this.currentRFQ;

    }

    loadRFQ(rfqId:string):Observable<any>{
        
        var retSubj:BehaviorSubject<any>=new BehaviorSubject<any>(new Object());

        console.log("I load rfq");
       
        this.backendService.getRESTResource("/api/rfqs/all/"+rfqId).subscribe(
            res => {
                console.log("Got responseeewewewe",res);
                // let subscriptions = (<Object[]>res.json()).map((channel: any) =>
                ///   new Channel({id:channel.id, name:channel.name,description:channel.description}));


                retSubj.next(res);

            },
            err => {
                console.error("Error loading beam",err);
                retSubj.error(err);

            }
        );
        
        return retSubj.asObservable();
    }






    /**
     *
     */
    loadInitialRFQs(){

        this.backendService.getRESTResource("/api/rfqs/all").subscribe(
            res => {
                console.log("Got response",res)
               // let subscriptions = (<Object[]>res.json()).map((channel: any) =>
                 ///   new Channel({id:channel.id, name:channel.name,description:channel.description}));

                this._rfqs.next(res.items);
            },
            err => console.log("Error retrieving rfqs....")
        );
    }


    /***
     *
     * @param rfqs
     * @param rfq
     * @returns {any[]}
     */
    private removeRFQ(rfqs:any[],rfq:any)
    {


        var idx = 0;

        var foundIdx=undefined;
        for (var r of rfqs) {
            if (r.id === rfq.id) {
                foundIdx=idx;
            }
            idx++;
        }

        console.log("Found to remove at idx "+foundIdx);
        if(foundIdx!=undefined)
        {
            rfqs.splice(foundIdx,1);
        }
        return rfqs;
    }


    /**
     *
     * @param subs
     * @param sub
     * @returns {ChannelSubscription[]}
     */
    private replaceRFQ(rfqs:any[],rfq:any)
    {
        var idx = 0;
        for (var r of rfqs) {
            if (r.id === rfq.id) {

                rfqs[idx] = rfq;
            }
            idx++;
        }
        return rfqs;
    }





    /**
     *
     */
 

 //   constructor(@Inject(Http) _http:Http) {
   constructor( _backendService:BackendService) {


       this.backendService=_backendService;

      

       this.backendService.onMessage(( data) => {
         
           if(data.message==="rfq.RFQCreatedEvt")
           {
           
               var rfqs=this._rfqs.getValue();

               rfqs.push(data.rfq);


               this._rfqs.next(rfqs);

           }

           if(data.message==="rfq.RFQUpdatedEvt" || data.message==="RFQMessageThreadUpdatedEvt" || data.message==="RFQMessageThreadCreatedEvt")
           {
               var rfqs=this._rfqs.getValue();



               rfqs=this.replaceRFQ(rfqs,data.rfq);
               this._rfqs.next(rfqs);

           }
           if(data.message==="rfq.RFQDeletedEvt")
           {
               var rfqs=this._rfqs.getValue();



               rfqs=this.removeRFQ(rfqs,data.rfq)
               this._rfqs.next(rfqs);

           }
           
       })

    }


    
    /*
    /**
     *
     * @param name
     * @returns {Observable<any>}
     */
    

    createRFQ(query:string): Observable<any> {

        var cmd:any=new Object();

        cmd.message="rfq.StructureQueryCmd";
        cmd.query=query;

        let obs= this.backendService.sendCommandSync(cmd);

        return obs;


    }

    updateRFQ(rfqId,query:string): Observable<any> {

        var cmd:any=new Object();

        cmd.message="rfq.StructureQueryCmd";
        cmd.rfqId=rfqId;
        cmd.query=query;


        let obs= this.backendService.sendCommandSync(cmd);

        return obs;


    }



}