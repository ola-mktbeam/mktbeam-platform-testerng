import {Component} from  '@angular/core';

import { RouterModule, Router,ActivatedRoute} from '@angular/router';

import {AuthService} from "./auth.service";


@Component({

    selector: 'login-view',
    templateUrl:'./login-view.html',
})
export class LoginViewComponent  {


   public username:String="";
   public password:String="";

    public errorMsg = '';


    constructor(private _authService: AuthService,private router:Router ) {


        this._authService.loginState$.subscribe(
            data=> {


                console.log("Got data",data);

                if(data==="common.AuthenticatedEvt")
                {


                    console.log("auth ok, redirect....")
                    this.router.navigateByUrl("/rfqs");

                }else{

                    this.errorMsg = 'Failed to login';

                }


            },
            err=> {
                console.log("err",err);
                this.errorMsg = 'Failed to login';
            }
        )
    }


    login() {

        console.log("lof subscribing, maybe...");


        this._authService.login(this.username,this.password);

        //  if(!this._authService.login(this.username,this.password)){

       // }
    }


}

