
import {Injectable, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from "@angular/http";


import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Subject} from "rxjs/Subject";

import {BackendService} from "../common/backend.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";




@Injectable()
export class MessageService {

  ///  private _localThreadMessages:BehaviorSubject<any[]> = new BehaviorSubject([]);

      _threadSubjects: {[key: string]: any}={};




    http:Http;
    backendService:BackendService;


    private



 //   get localThreadMessages() {

   //     return this._localThreadMessages.asObservable();


   // }

    threadMessagesAsObservable(threadId:string):Observable<any[]> {


        console.log("Trying to get subject as osbervable for id "+threadId,this._threadSubjects);

        if(this._threadSubjects[threadId]==undefined)
        {

            this._threadSubjects[threadId]=new BehaviorSubject([]);
        }

        return this._threadSubjects[threadId].asObservable();


    }




    initThreads(threadIds:string[]){


        this._threadSubjects={};



    }






    /**
     *
     */
    loadInitialMessages(threadIds:string[]){


        for(let threadId of threadIds) {

            if(this._threadSubjects[threadId]==undefined)
            {

                this._threadSubjects[threadId]=new BehaviorSubject([]);
            }




            this.backendService.getRESTResource("/api/message/threads/"+threadId+"/messages").subscribe(
                res => {
                    console.log("Got response",res)
                    // let subscriptions = (<Object[]>res.json()).map((channel: any) =>
                    ///   new Channel({id:channel.id, name:channel.name,description:channel.description}));


                    var threadSubj=this._threadSubjects[threadId];
                    threadSubj.next(res.items);
                    console.log("Loaded data for subject id "+threadId,this._threadSubjects);

                },
                err => console.log("Error retrieving messages for thread ...."+threadId)
            );

        }




    }





    /***
     *
     * @param rfqs
     * @param rfq
     * @returns {any[]}
     */
    private removeMessage(messages:any[],message:any)
    {


        var idx = 0;

        var foundIdx=undefined;
        for (var m of messages) {
            if (m.id === message.id) {
                foundIdx=idx;
            }
            idx++;
        }

        if(foundIdx!=undefined)
        {
            messages.splice(foundIdx,1);
        }
        return messages;
    }


    /**
     *
     * @param subs
     * @param sub
     * @returns {ChannelSubscription[]}
     */
    private replaceMessage(messages:any[],message:any)
    {
        var idx = 0;
        for (var m of messages) {
            if (m.id === message.id) {

                messages[idx] =message;
            }
            idx++;
        }
        return messages;
    }

    private addMessageIfNew(messages:any[],message:any)
    {
        var idx = 0;
        for (var m of messages) {
            if (m.id === message.id) {
                return;
            }
            idx++;
        }
        messages.push(message);
        return messages;
    }





    /**
     *
     */
 

 //   constructor(@Inject(Http) _http:Http) {
   constructor( _backendService:BackendService) {


       this.backendService=_backendService;

      

       this.backendService.onMessage(( data) => {


           if(data.message==="message.MessagePostedEvt")
           {
       //        var msgs=this._localThreadMessages.getValue();

               var threadId=data.postedMessage.threadId;
               console.log("A message was posted to thread "+threadId);

               var msgs=this._threadSubjects[threadId].getValue();



              this.addMessageIfNew(msgs,data.postedMessage);
         
               this._threadSubjects[threadId].next(msgs);


           }
           
           
       })

    }



    postMessage(threadId:string,msg:string): Observable<any> {

              
        
   
   
        var cmd:any=new Object();

        cmd.message="message.CreateAndPostMessageCmd";
        cmd.threadId=threadId;
        cmd.body=msg;


        let obs= this.backendService.sendCommandSync(cmd);

        return obs;

        

    }


    
    
    }