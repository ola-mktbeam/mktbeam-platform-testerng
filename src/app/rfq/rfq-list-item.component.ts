import {Component} from  '@angular/core';

import {RFQService} from "./rfq.service";

import {Router} from '@angular/router';

@Component({
    selector: 'rfq-list-item',
    inputs:['rfq'],
    template:`        
        <div class="rfq-list-item" (click)="selectRFQ(rfq)">
           <span *ngIf="rfq===rfqService.currentRFQ">Active!</span>
           
            <div><b>Id:</b>{{rfq.id}} - <b>Seqno:</b>{{rfq.seqno}}</div>            
            <div><b>State:</b>{{rfq.state}}</div>
            <button class="btn btn-xs" (click)="viewDetails(rfq)">Expand</button>
             <hr>
              <div class="beam-list-item-text">
                 <small><div  [innerHTML]="rfq.structureJson"></div></small>              
            </div>
           
        </div>
            
        `
})
export class RFQListItemComponent {
   // private publishedBeam;


    constructor(
        private rfqService: RFQService,
        private router:Router
        )
    { }

    selectRFQ(rfq: any)
    {
        this.rfqService.setCurrentRFQ(rfq);
    

    }

    viewDetails(rfq: any)
    {
        this.rfqService.setCurrentRFQ(rfq);
        this.router.navigateByUrl('/rfqs/'+rfq.id);

    }

    ngOnInit() {

    }

}
