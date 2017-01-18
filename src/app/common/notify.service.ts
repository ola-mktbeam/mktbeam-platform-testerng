import {Injectable, Inject} from '@angular/core';




@Injectable()
export class NotifyService {

    notifications = [];



    public pushNotification(type:string, message:string) {
        var n:any=new Object();

        n.type=type;
        n.message=message;
        this.notifications.push(n);

    }


    public popNotification(type:string, message:string) {

        return this.notifications.pop();

    }


}