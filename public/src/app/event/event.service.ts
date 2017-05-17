import { Injectable} from '@angular/core';

import { Event } from './event';
import { Member} from './member';
import { FirebaseService } from '../firebase/firebase.service';
import { UserService } from '../user.service';
import { SurveyService } from './survey/survey.service';
import { ChatService } from './chat/chat.service';
import { TaskService } from './task/task.service';
import { ReplaySubject} from 'rxjs';


@Injectable()
export class EventService{

    eventlistcallback:any[];
    eventlist:ReplaySubject<Event[]>;

    constructor(
        private firebase: FirebaseService,
        private survey: SurveyService,
        private chat: ChatService,
        private task: TaskService,
        private user: UserService,
    ){
        this.eventlistcallback = [];
        this.eventlist = new ReplaySubject(1);
    }

    //@Deprecated
    /*getEventList(ecallback:any):void{
        this.eventlistcallback.push(ecallback);
        let fcallback = function(data:any){
            let elist:Event[] = [];
            for(let key in data){
                let temp:Event = new Event(data[key]);
                temp.setKey(key);
                elist.push(temp);
            }
            //this.eventlist.next(elist);
            ecallback(elist);
        }
        this.getNEventList();
        this.firebase.getEventList(fcallback);
    }*/

    getEventList():void{
        this.firebase.getEventList(data => {
            let elist:Event[] = [];
            let count:number = 0;
            for(let key in data){
                //let temp:Event = new Event(data[key]);
                //temp.setKey(key);
                //this.getEvent(key,data => temp=data);
                //elist.push(temp);
                this.getEventWithIndex(key,(data,index) => {
                    elist.splice(index,1,data);        
                    this.eventlist.next(elist);
                },count);
                 count++;
            }
            //console.log("event list: print events")
            for(let k in elist){
                //console.log(elist[k]);
            }
            //console.log("getEventList: append new List");
            this.eventlist.next(elist);
        });
    }

    getListAsReplaySubject():ReplaySubject<Event[]>{
        return this.eventlist;
    }

    getEvent(key:string,callback:any):void{
        this.getEventWithIndex(key,callback,0);
    }

    getEventWithIndex(key:string,callback:any,index:number):void{
        this.firebase.getEventData(key,data => {
            data = data.val();
            ////console.log(data);
            let e:Event = this.convertDataToEvent(data);
            e.setKey(key);
            ////console.log("TEst", e);
            callback(e,index);
        });
    }

    convertDataToEvent(data:any):Event{
        let e:Event = new Event(data['TITLE']);
            e.setAuthor(data['AUTHOR']);
            if(data['DESCRIPTION']){
                e.setDescription(data['DESCRIPTION']);
            }
            if(data['FROM']){
                e.setDateFrom(new Date(data['FROM']));
            }
            if(data['TO']){
                e.setDateTo(new Date(data['TO']));
            }
            if(data['TYPE']){
                e.setType(data['TYPE']);
            }
            if(data['SURVEY']){
                e.setSurvey(this.survey.convert(data['SURVEY']));
            }
            if(data['TASK']){
                e.setTask(this.task.convert(data['TASK']));
            }
            if(data['LOCATION']){
                e.setLocation(data['LOCATION']);
            }
            if(data['CHATKEY']){
                e.setChatKey(data['CHATKEY']);
            }
            
            let m:Member[] = [];
            for(let n in data['MEMBER']){
                ////console.log(n);
                m.push(new Member(data['MEMBER'][n],n));
            }
            e.setMember(m);
            return e;
    }

    createEvent(e:Event):void{
        e.author = this.user.getUser().uid;
        e.member.push(new Member(this.user.getUser().email,''));
        e.chatkey = this.chat.generateKey();
        this.firebase.createEvent(e);
    }

    deleteEvent(key:string):void{
        let tempfire = this.firebase;
        let tempuser = this.user;
        let tempthis = this;
        this.getEvent(key,function(e:Event){
            //console.log('inCallback');
            //console.log(e);
            tempthis.doOffEvent(key);
            tempfire.deleteEvent(key,tempuser.getUser().uid == e.getAuthor(),e.getMember());
        });        
    }

    doOffEvent(key:string){
        this.firebase.doOffEvent(key);
    }

    removeCallback(callback:any){
       for(let ec in this.eventlistcallback){
           if(this.eventlistcallback[ec] == callback){
               //console.log('callback gefunden');
           }else{
               //console.log('callback nicht gefunden');
           }
       }
    }

    updateEvent(newEvent:Event, oldEvent:Event):void{
        if (newEvent.key != '') {
            newEvent.author = oldEvent.author;
            newEvent.member.push(new Member(this.user.getUser().email, this.user.getUser().uid));
            this.firebase.updateEvent(newEvent,oldEvent);
        }
    }

}