import {Component} from  '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import { RFQService} from "./rfq.service";

import {AuthService} from "../auth/auth.service";
import {BackendService} from "../common/backend.service";



@Component({
    selector: 'rfq-list',
    inputs:['rfqs'],
 
    template:`                 
             <div   *ngFor="let r of rfqs|async">
               <rfq-list-item [rfq]="r"> </rfq-list-item>              
             </div>
        `
})
export class RFQListComponent {
    

}

