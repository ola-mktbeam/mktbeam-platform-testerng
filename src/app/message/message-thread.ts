import {Component,Input,ViewChild,ElementRef} from  '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import { RFQService} from "./../rfq/rfq.service";

import {AuthService} from "../auth/auth.service";
import {BackendService} from "../common/backend.service";
import {MessageService} from "./message.service";
import {Observable} from "rxjs/Observable";



@Component({
    selector: 'message-thread',
    template:

        `          
                 <div class="message-thread">
                 <h4>Thread name:{{thread.name}}</h4>
                  <h5>Thread id:{{thread.threadId}}</h5>
                 <b>Members:</b><span *ngFor="let m of thread.members">{{m.name}}, </span>
                    <div #scrollMe class="message-thread-messages">
                        <div   *ngFor="let m of messages|async">
                            <thread-message [message]="m" >  </thread-message>              
                        </div>
                 
                    </div>
   
                <input class="form-control" #message placeholder="Type message and press enter..."  (keyup.enter)="postMessage(message.value);message.value=''"/>
                </div>
        `
})
export class MessageThreadComponent {

    errorText:String;



    @Input() thread: any=new Object();

    messages:Observable<any[]>;


    @ViewChild('scrollMe') private myScrollContainer: ElementRef;

    initTimer:any;
  //  messages:Observable<any[]>;

    constructor(
        private messageService: MessageService
    )
    {








    }

    postMessage(msg:string){
     //   this.messageService.postMessage2(this.thread.threadId,msg);


                this.messageService.postMessage(this.thread.threadId,msg).subscribe(
            messagePosted=> {
                console.log("message posted ok");
            //    this.scrollToBottom();
            },err=>
            {
                console.log("err",err)
                this.errorText="Could not post message... ("+err+")";
            })


    }

    scrollToBottom(): void {

        let timer = Observable.timer(100);
        timer.subscribe(t=> this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight);

   ///     this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight

    }


    ngAfterViewInit() {


      //  this.initTimer=  Observable.timer(1000,1000);

    //    this.initTimer.subscribe(this.tryToInitThread(this.thread));

        console.log("thread is ",this.thread);
        this.messages=this.messageService.threadMessagesAsObservable(this.thread.threadId);

        this.messageService._threadSubjects[this.thread.threadId].subscribe(
            changed=>{
                this.scrollToBottom();
            }
        )




   //     this.scrollToBottom();
    }


    tryToInitThread(thread:any){

        console.log("Waiting to init thread,,",thread);

        //this.messages=this.messageService.threadMessagesAsObservable(this.thread.id);


    }








}

