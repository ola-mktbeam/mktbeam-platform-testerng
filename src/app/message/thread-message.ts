import {Component} from  '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import { RFQService} from "./../rfq/rfq.service";

import {AuthService} from "../auth/auth.service";
import {BackendService} from "../common/backend.service";
import {MessageService} from "./message.service";



@Component({
    selector: 'thread-message',

    inputs:['message'],

    providers: [
        BackendService,
        AuthService,
        RFQService
    ],
    template:`      
                 <div [ngClass]="{'thread-message-body-wrapper-received': currentUserId!=message.userId, 'thread-message-body-wrapper-sent': currentUserId==message.userId}" >
                 
                    <div class="thread-message-header">
                       [{{message.posted}}]{{message.userName}} <span *ngIf="currentUserId==message.userId">(Me!)</span> wrote: 
                    </div>
                    <div [ngClass]="{'thread-message-body-received': currentUserId!=message.userId, 'thread-message-body-sent': currentUserId==message.userId}">
                        {{message.body}}              
                    </div>
                </div> 

        `
})
export class ThreadMessageComponent {

    currentUserId:string;

    constructor(
        private messageService: MessageService,private authService:AuthService
    )
    {
        this.currentUserId=authService.getLoggedInUser().id;

    }



}

