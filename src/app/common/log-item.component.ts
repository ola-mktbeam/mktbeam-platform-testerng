import {Component} from  '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';


import {AuthService} from "../auth/auth.service";
import {BackendService} from "../common/backend.service";



@Component({
    selector: 'log-item',
    inputs:['logitem'],
 
    template:`                 
             <div>
                 <div *ngIf="!logitem.expanded" class="log-item">
                      {{logitem.created | date: 'ddMMyyyyHHmmss'}} - {{logitem.text}}:{{logitem.message.message}}<button class="btn btn-xs" href="#" (click)="logitem.expanded=!logitem.expanded">+</button>
                 </div>
                 <div *ngIf="logitem.expanded" class="log-item">
                      {{logitem.created | date: 'ddMMyyyyHHmmss'}} - {{logitem.text}}:{{logitem.message.message}}<button class="btn btn-xs" href="#" (click)="logitem.expanded=!logitem.expanded">-</button>
                        <pre>{{logitem.message|json}}</pre>                            
                 
                 </div>
                 
               
                 
               
                 </div>
             
             
             
        `
})
export class LogItemComponent {
    

}

