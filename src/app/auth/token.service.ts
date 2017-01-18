import {Injectable, Inject} from '@angular/core';




@Injectable()
export class TokenService {

    private token:string;
    private user:any;

    getUser():any{


        //    return JSON.parse(localStorage.getItem("user"));
        return this.user;
    }

    getToken():string{
        console.log("get token:"+this.token);

        return this.token;
    }

    setToken(token:string)
    {
        console.log("Set token:"+token);
        this.token=token;
    }

    setUser(user:any)
    {

        this.user=user;

    }

}
