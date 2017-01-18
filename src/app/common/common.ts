
export * from './notify.service'

import {Pipe} from '@angular/core'

@Pipe({
    name: 'namevalue'
})
export class NameValuePipe {
    transform(value: string, args: string) : string {
        
        let i=value.indexOf(":");
        
        if(i==-1 && args=='value')
            return "";
        if(i==-1 && args=='name')
            return value;


        console.log("args",args);
        if(args==='name')
            return value.substr(0,i);
        
        return value.substr(i+1);
        
        
    }
}