import {Injectable} from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {Event} from '../event/event';
import {Member} from '../event/member';
declare var firebase: any;

@Injectable()
export class FirebaseEventService{

    constructor(
        private router: Router,
        private user: UserService,
    ) {}

    getEventList(callback:any): void{
        let database = firebase.database().ref('/USER/' + this.user.getUser().uid + '/EVENTLIST/');
        database.on('value', function(snap:any){
            callback(snap.val());
        });
    }

    getEventData(key: string, callback: any): void {
        let database = firebase.database().ref('/EVENT/' + key);
        database.on('value', callback);
    }
        deleteEvent(key:string,author:boolean,member:Member[]){
        let updates = {};
        if(author){
            this.addMemberToEvent(key,null,member);
            updates['/EVENT/'+key] = null;
        }else{            
            updates['/USER/'+this.user.getUser().uid+'/EVENTLIST/'+key] = null;
            updates['/EVENT/'+key+'/MEMBER/'+this.user.getUser().uid] = null;
        }
        firebase.database().ref().update(updates);
    }

    doOffEvent(key:string){
        firebase.database().ref('/EVENT/'+key).off();
    }

    doOffCallback(callback:any){
        firebase.database().ref('/USER/' + this.user.getUser().uid + '/EVENTLIST/').off('value',callback);
    }

    createEvent(e: Event): void {
        let eventData = {
            AUTHOR: e.author,
            TITLE: e.title,
            DESCRIPTION: e.description,
            TYPE: e.type,
            LOCATION: e.location,
            CHATKEY: e.chatkey,
            FROM: e.date_from,
            TO: e.date_to,
        };
        let newEventKey = firebase.database().ref('/EVENT/').push().key;
        let updates = {};
        updates['/EVENT/' + newEventKey] = eventData;
        firebase.database().ref().update(updates);
        this.addMemberToEvent(newEventKey, e.title, e.member);
    }


    updateEvent(newEvent: Event, oldEvent:Event): void {
        let update = {};
        // update['/EVENT/'+newEvent.key+'/AUTHOR'] = newEvent.getAuthor();
        update['/EVENT/'+newEvent.key+'/TITLE'] = newEvent.getTitle();
        update['/EVENT/'+newEvent.key+'/DESCRIPTION'] = newEvent.getDescription();
        update['/EVENT/'+newEvent.key+'/TYPE'] = newEvent.getType();
        update['/EVENT/'+newEvent.key+'/LOCATION'] = newEvent.getLocation();
        update['/EVENT/'+newEvent.key+'/FROM'] = newEvent.getDateFrom();
        update['/EVENT/'+newEvent.key+'/TO'] = newEvent.getDateTo();
        update['/EVENT/'+newEvent.key+'/MEMBER']=null;
        let memberlist = oldEvent.getMember();
        for(let member in memberlist){
            update['/USER/'+memberlist[member].getID()+'/EVENTLIST/'+oldEvent.key] = null;
        }

        firebase.database().ref().update(update).then(()=>{
            this.addMemberToEvent(newEvent.getKey(), newEvent.getTitle(),newEvent.getMember());
        });
        
    } 

    addMemberToEvent(ekey: string, eTitle: string, member: Member[]): void {
        let update = {};
        let counter: number = 0;
        
        for (let m in member) {
            let database = firebase.database().ref("/USER/").orderByChild("EMAIL").equalTo(member[m].getEmail());
            database.once('value').then(function (snap: any) {
                if (snap != null) {
                    for (let n in snap.val()) {
                        update['/USER/' + n + '/EVENTLIST/' + ekey] = eTitle;
                        if(eTitle){
                            update['/EVENT/' + ekey + '/MEMBER/'+ n] = member[m].getEmail();
                        }
                    }
                }
                counter++;
                if (counter === member.length) {
                    firebase.database().ref().update(update);
                }
            });
        }
    }
}