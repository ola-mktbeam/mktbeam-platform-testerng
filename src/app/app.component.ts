import {Component} from  '@angular/core';



import {BackendService} from "./common/backend.service";
import {AuthService} from "./auth/auth.service";
import {TokenService} from "./auth/token.service";
import {RFQService} from "./rfq/rfq.service";
import {MessageService} from "./message/message.service";
import {RFQResolver} from "./app.module";

export class API{
  name:String
  url:String;

  constructor(name:String,url:String)
  {
    this.name=name;
    this.url=url;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  private authService:AuthService;

  private backendService:BackendService;

  private currentAPI:API;

  private apis:Array<API>;



  constructor(
    _authService: AuthService,
    _backendService:BackendService
  ) {


    this.authService=_authService;
    this.backendService=_backendService;

    this.apis=new Array<API>();

    this.apis.push(new API("Latest","http://52.59.95.154:8080"))
    this.apis.push(new API("Localhost","http://127.0.0.1:8080"))


    this.currentAPI=this.apis[0];


    console.log("I app component constructor");
    this.backendService.onOpen((e) => {

      console.log("backnedService:onOpen",e);

    });

    this.backendService.onMessage((data) => {
      //      console.log("backnedService:onMessage",data);


    });
    this.backendService.onClose((data) => {
      console.log("backnedService:onClose",data);
    });



    this.backendService.open();
  }



  ngOnInit() {
    console.log("App component onIniiit");


    this.authService.checkCredentials();
  }

}


