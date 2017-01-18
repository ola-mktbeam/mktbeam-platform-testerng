import {Component} from  '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';


import {AuthService} from "../auth/auth.service";
import {BackendService} from "../common/backend.service";



@Component({
    selector: 'log',
    inputs:['logitems'],
 
    template:`                 
             <div class="well">
             
                <div  *ngFor="let l of logitems|async">
                
                    <log-item [logitem]="l" ></log-item>   
                
            </div>
             
             </div>
             
        `
})
export class LogComponent {
    

}

