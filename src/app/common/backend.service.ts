
import {Injectable, Inject} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {UUID} from "./UUID";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {AuthService} from "../auth/auth.service";
import {TokenService} from "../auth/token.service";
import {BehaviorSubject} from "rxjs/Rx";

declare var SockJS: any;

console.log("sockjs is",SockJS);
//import * as SockJS from "sockjs-client"
export class ServiceError{

    reason:string;
    created:string;
}

export class LogItem{

    created : Date;
    text:string;
    message:any;
    expanded:boolean=false;

}

@Injectable()
export class BackendService {



    private _logitems:BehaviorSubject<LogItem[]> = new BehaviorSubject([]);

    get logitems(){
        return this._logitems.asObservable();
    }



    private _errors:BehaviorSubject<ServiceError[]>=new BehaviorSubject([]);

    get errors() {

        return this._errors.asObservable();

    }




 //private serverRoot:string="http://localhost:8080"
   private serverRoot:string="http://52.59.95.154:8080"

    URL: string = this.serverRoot+"/api/async";


    sock: any;
    handlers = {};



    private http:Http;
    private tokenService:TokenService;
    private syncCommands=[];

    private currentSyncCommand:any;

    private syncCommandSubject:Subject<any>;

    private _opened: boolean = false;

    public open(): void {
        if (!this._opened) {
            this.sock = new SockJS(this.URL);
            this.sock.onopen = (e) => {
                this.callHandlers('open', e);
            }
            this.sock.onmessage = (e) => {
                this.messageReceived(e);
            }
            this.sock.onclose = (e) => {
                this.callHandlers('close', e);
            }
            this._opened = true;
        }
    }

    public isOpen(): boolean {
        return this._opened;
    }

    public close(): void {
        if (this._opened) {
            this.sock.close();
            delete this.sock;
            this._opened = false;
        }
    }

    private addLogMessage(text:string,msg:any)
    {


        var li=this._logitems.getValue();
        var i=new LogItem();
        i.created=new Date();
        i.text=text
        i.message=msg;

        li.push(i)
        this._logitems.next(li);
    }


    private messageReceived (e:MessageEvent) {

        var msg = JSON.parse(e.data);


        this.addLogMessage("Received:",msg);

        //Save errors....
        if(msg.message==="common.ServiceErrorEvt")
        {

            console.log("ERRROR...");
            var errors=this._errors.getValue();
            if(errors.length>=3)
                errors.shift();

            var err=new ServiceError();
            err.reason=msg.reason;
            err.created=msg.created;
            errors.push(err);


        }

      //  console.log("Received event from server",msg);
        if(this.currentSyncCommand!=undefined && this.currentSyncCommand.id===msg.id) {
            //console.log("This event is related to a current sync command, try to notify observers..wwww..",msg);

            this.syncCommandSubject.next(msg);


        }





        this.callHandlers('message', msg);
    }

    private callHandlers (type: string, data:any) {
        if (this.handlers[type]) {
            this.handlers[type].forEach(function(cb) {

                cb.apply(cb, [data]);
            });
        }
    }

    private addEvent (type: string, callback: Function) : void {
        if (!this.handlers[type]) this.handlers[type] = [];
        this.handlers[type].push(callback);
    }



    public onOpen (callback: (e: any) => any) : void {
        console.log("sockjs open")
        this.addEvent('open', callback);
    }
    public onMessage (callback: (data: any) => any) : void {
        this.addEvent('message', callback);
    }
    public onClose (callback: (e: any) => any) : void {
        this.addEvent('close', callback);
    }


    public sendCommand ( cmd: any) {
        if (this._opened) {

            var uuid  = UUID.newUUID();
            cmd.id= uuid;
            var token=localStorage.getItem("token");

            cmd.token=token;

            console.log("sending",cmd);

            var msgJson = JSON.stringify(cmd);
            this.sock.send(msgJson);


            this.addLogMessage("Sent:",cmd);


        }
    }

    public sendCommandSync ( cmd: any):Observable<any> {
        if (this._opened) {

            var uuid  = UUID.newUUID();
            cmd.id= uuid;

            var token=this.tokenService.getToken();
            cmd.token=token;

            console.log("sending",cmd);

            var msgJson = JSON.stringify(cmd);
            this.currentSyncCommand=cmd;
            this.sock.send(msgJson);
            this.addLogMessage("Sent:(SYNC)",cmd);

            this.syncCommandSubject=new Subject<any>();



            return this.syncCommandSubject;



        }
    }

    constructor( _http:Http, _tokenService:TokenService)
    {
        this.http=_http;

        this.tokenService=_tokenService;

    }

    public getRESTResource ( url: string):Observable<any> {


        var token=this.tokenService.getToken();
        var headers = new Headers();
        headers.append('Authorization', token);

   //     console.log("Appeding token:; "+token);
        return this.http.get(this.serverRoot+url,{headers:headers})
          //  .map(response => response.json());

    }
}
