
import {Injectable, Inject} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Http} from "@angular/http";


import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {Subject} from "rxjs/Subject";
import {TokenService} from "./token.service";
import {BackendService} from "../common/backend.service";




@Injectable()
export class AuthService {


    private isAuthenticating:boolean=false;

    private authenticationFailed:boolean=false;



    private router:Router;

  //  private lstate:string="";


    loginState$:Subject<String>;
    private _observer:Observer<String>;

    private tokenService:TokenService;

//    private loginState:Observable<any>;

    constructor(
        private _router: Router, _tokenService:TokenService, private _backendService:BackendService
        , private route: ActivatedRoute ) {

        this.router=_router;
        this.loginState$ = new Subject<String>();


        this.tokenService=_tokenService;
        
        _backendService.onMessage((data) => {


            if(data.message==="common.AuthenticatedEvt")
            {



                 var userJson = JSON.stringify(data.user);



                this.tokenService.setToken(data.issuedToken);
                this.tokenService.setUser(data.user);



                this.loginState$.next(data.message);
        

            }

            if(data.message==="common.AuthenticationFailedEvt")
            {

                   this.loginState$.next(data.message);


            }




        });




    }



    logout() {
//        localStorage.removeItem("token");
  //      localStorage.removeItem("user");

        this.tokenService.setToken(null);
        this.tokenService.setUser(null);


        this._router.navigate(['LoginView']);
        
    }

    login(username:String, password:String):Observable<any>{



        var cmd:any=new Object();

        cmd.message="common.AuthenticateCmd";
        cmd.username=username;
        cmd.password=password;

     

        this._backendService.sendCommand(cmd);





        return this.loginState$;


    }

    authenticationInProgress(){

        return this.isAuthenticating;

    }
    lastAuthenticationFailed(){

        return this.authenticationFailed;

    }

    isAuthenticated():boolean{

//        if (localStorage.getItem("token")===null){
        if (this.tokenService.getToken()===undefined){

            return false;
        }
        return true;
    }

    getLoggedInUser():any{

       
    //    return JSON.parse(localStorage.getItem("user"));
        return this.tokenService.getUser()
    }

    getToken():string{

       return this.tokenService.getToken();
    }
    
    checkCredentials(){

     //   if (localStorage.getItem("token")===null)

        console.log("checkcredentials");
        var token=this.tokenService.getToken();
        
        if (this.tokenService.getToken()===undefined ){
            console.log("navigatingggg...");

            this.router.navigateByUrl("/login");
        }
    }



}