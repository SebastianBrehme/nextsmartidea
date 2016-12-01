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

    getEvent(key:string,callback:any):void{        
        this.firebase.getEventData(key,function(data:any){
            data = data.val();
            let e:Event = new Event(data['TITLE']);
            e.setAuthor(data['AUTHOR']);
            if(data['DESCRIPTION']){
                e.setDescription(data['DESCRIPTION']);
            }
            if(data['FROM']){
                e.setDateFrom(data['FROM']);
            }
            if(data['TO']){
                e.setDateTo(data['TO']);
            }
            if(data['TYPE']){
                e.setType(data['TYPE']);
            }
            e.setKey(key);
            let m:string[] = [];
            for(let n in data['MEMBER']){
                m.push(data['MEMBER'][n]);
            }
            e.setMember(m);
            callback(e);
        });
    }

    createEvent(e:Event):void{
        e.author = this.user.getUser().uid;
        e.member.push(this.user.getUser().email);
        this.firebase.createEvent(e);
    }

    deleteEvent(key:string):void{
        let tempfire = this.firebase;
        let tempuser = this.user;
        let tempthis = this;
        this.getEvent(key,function(e:Event){
            console.log('inCallback');
            console.log(e);
            tempthis.doOffEvent(key);
            tempfire.deleteEvent(key,tempuser.getUser().uid == e.getAuthor(),e.getMember());
        });        
    }

    doOffEvent(key:string){
        this.firebase.doOffEvent(key);
    }

    removeCallback(callback:any){
        this.firebase.doOffCallback(callback);
    }

    updateEvent(e:Event):void{
        if (e.key != '') {
            this.firebase.createEvent(e, e.key);
        }
    }

}