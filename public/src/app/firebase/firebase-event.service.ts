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

    getEventList(callback:any){
        console.log('firebaseservice: getEventist');
        console.log('UserID: '+this.user.getUser().uid);
        let database = firebase.database().ref('/USER/' + this.user.getUser().uid + '/EVENTLIST/');
        database.on('value', function(snap:any){
            callback(snap.val());
        });
        console.log('getEvent finished ');
    }

    getEventData(key: string, callback: any): void {
        let database = firebase.database().ref('/EVENT/' + key);
        database.on('value', callback);
    }
        deleteEvent(key:string,author:boolean,member:Member[]){
        console.log(key);
        console.log(author);
        let updates = {};
        if(author){
            this.addMemberToEvent(key,null,member);
            updates['/EVENT/'+key] = null;
            //updates['/USER/'+this.user.getUser().uid+'/EVENTLIST/'+key] = null;
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
        console.log('firebaseservice: createEvent');
        let eventData = {
            AUTHOR: e.author,
            TITLE: e.title,
            DESCRIPTION: e.description,
            TYPE: e.type,
            FROM: e.date_from,
            TO: e.date_to,
        }
        
        console.log('create key');
        let newEventKey = firebase.database().ref('/EVENT/').push().key;
        console.log(newEventKey);
        
        let updates = {};
        updates['/EVENT/' + newEventKey] = eventData;
        //updates['/USER/' + this.user.getUser().uid + '/EVENTLIST/' + newEventKey] = e.getTitle(); //läuft über add Member
        console.log(updates);
        firebase.database().ref().update(updates);

        this.addMemberToEvent(newEventKey, e.title, e.member);

        console.log('createEvent finished');
    }


    updateEvent(newEvent: Event, oldEvent:Event): void {
        let update = {};
        //update['/EVENT/'+newEvent.key+'/AUTHOR'] = newEvent.getAuthor();
        update['/EVENT/'+newEvent.key+'/TITLE'] = newEvent.getTitle();
        update['/EVENT/'+newEvent.key+'/DESCRIPTION'] = newEvent.getDescription();
        update['/EVENT/'+newEvent.key+'/TYPE'] = newEvent.getType();
        update['/EVENT/'+newEvent.key+'/FROM'] = newEvent.getDateFrom();
        update['/EVENT/'+newEvent.key+'/TO'] = newEvent.getDateTo();
        update['/EVENT/'+newEvent.key+'/MEMBER']=null;
        let memberlist = oldEvent.getMember();
        for(let member in memberlist){
            console.log(memberlist[member].getID());
            console.log(oldEvent.key);
            update['/USER/'+memberlist[member].getID()+'/EVENTLIST/'+oldEvent.key] = null;
        }

        firebase.database().ref().update(update).then(()=>{
            console.log("updated");
            this.addMemberToEvent(newEvent.getKey(), newEvent.getTitle(),newEvent.getMember());
        });
        
    } 

    addMemberToEvent(ekey: string, eTitle: string, member: Member[]): void {
        console.log("firebaseservice addMemberToEvent");
        let update = {};
        let counter: number = 0;
        console.log(member)
        console.log(ekey);
        
        for (let m in member) {
            let database = firebase.database().ref("/USER/").orderByChild("EMAIL").equalTo(member[m].getEmail());
            database.once('value').then(function (snap: any) {
                console.log('addMemberToEvent: '+snap.val());
                if (snap != null) {
                    for (let n in snap.val()) {
                        console.log(n);
                        update['/USER/' + n + '/EVENTLIST/' + ekey] = eTitle;
                        if(eTitle){
                            update['/EVENT/' + ekey + '/MEMBER/'+ n] = member[m].getEmail();
                        }
                    }
                }
                counter++;
                if (counter === member.length) {
                    console.log('memberupdate',update);
                    firebase.database().ref().update(update);
                }
            });
        }
        console.log("do update");
    }
}