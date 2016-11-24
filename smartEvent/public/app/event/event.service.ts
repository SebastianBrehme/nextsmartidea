import { Injectable } from '@angular/core';

import { Event } from './event';
import { FirebaseService } from '../firebase.service';
import { UserService } from '../user.service';

@Injectable()
export class EventService{

    constructor(
        private firebase: FirebaseService,
        private user: UserService,
    ){}

    //addEvent(e:Event):void{
      // this.eventdata.addEvent(e);
    //}

    getEventList(ecallback:any):void{
        let fcallback = function(data:any){
            let elist:Event[] = [];
            for(let key in data){
                let temp:Event = new Event(data[key]);
                temp.setKey(key);
                elist.push(temp);
            }
            ecallback(elist);
        }
        this.firebase.getEventList(fcallback);
    }

    getEvent(id:string,callback:any):Promise<Event>{        
        return this.firebase.getEventData(id,callback);
    }

    createEvent(e:Event){
        e.author = this.user.getUser().uid;
        //if(!e.member){
        //    e.member=[];
        //}
        e.member.push(this.user.getUser().email);
        this.firebase.createEvent(e);
        //this.firebase.addMemberToEvent('key','titel',['fail','fbaain@gmail.com','robin.warth@gmail.com']);
    }

    deleteEvent(id:string):void{

    }

    //updateEvent(id:string,data:Object):void{

    //}

    updateEvent(e:Event):void{
        if (e.key != '') {
            this.firebase.createEvent(e, e.key);
        }
    }

}