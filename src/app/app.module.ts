import { RouterModule, Routes,ActivatedRouteSnapshot,RouterStateSnapshot,Resolve } from '@angular/router';
import { NgModule,Injectable }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NameValuePipe} from "./common/common";
import { AppComponent }   from './app.component';
import {LoginViewComponent} from "./auth/login-view.component";
import {RfqsViewComponent} from "./rfq/rfqs-view.component";
import {RfqDetailViewComponent} from "./rfq/rfq-detail-view.component";
import {RFQListComponent} from "./rfq/rfq-list.component";
import {RFQListItemComponent} from "./rfq/rfq-list-item.component";
import {MessageThreadComponent} from "./message/message-thread";
import {ThreadMessageComponent} from "./message/thread-message";
import {Observable} from "rxjs/Observable";
import {RFQService, RFQ} from "./rfq/rfq.service";
import {BackendService} from "./common/backend.service";
import {TokenService} from "./auth/token.service";
import {AuthService} from "./auth/auth.service";
import {MessageService} from "./message/message.service";
import {LogComponent} from "./common/log.component";
import {LogItemComponent} from "./common/log-item.component";



@Injectable()
export class RFQResolver implements Resolve<any> {

  constructor(private rfqService: RFQService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>{


    return this.rfqService.loadRFQ(route.params['id']);
  }
}

const appRoutes: Routes = [
  { path: 'login', component: LoginViewComponent },
  { path: '', component: LoginViewComponent },
  { path: 'rfqs/:id', component: RfqDetailViewComponent,
    //    resolve: {
    //      rfq: RFQResolver
    //}
  },
  { path: 'rfqs', component: RfqsViewComponent},

//    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports:      [ BrowserModule , FormsModule,  HttpModule,  RouterModule.forRoot(appRoutes)],
  declarations: [ AppComponent,NameValuePipe, LoginViewComponent, RfqsViewComponent, RfqDetailViewComponent , RFQListComponent, RFQListItemComponent,MessageThreadComponent,ThreadMessageComponent,LogComponent,LogItemComponent],
  bootstrap:    [ AppComponent ],
  providers: [RFQResolver,RFQService,BackendService,TokenService,AuthService,MessageService
  ]
})
export class AppModule { }
