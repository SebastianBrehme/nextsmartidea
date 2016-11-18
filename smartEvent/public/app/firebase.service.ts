import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { EventDataService } from './event/event-data.service';
import { Event } from './event/event';
import { Router } from '@angular/router';

declare var firebase: any;

@Injectable()
export class FirebaseService {

    auth: any;

    constructor(
        private router: Router,
        private user: UserService,
        private events: EventDataService,
    ) {
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
        console.log('constructor');
    }

    signIn(): any {
        console.log('signin');
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function (result: any) {
            console.log('signedin');
            if (result.credential) {
                //Attention: This code is never executed, don't know why...
                let token = result.credential.accessToken;
                this.user.setUser(result.user);
                this.user.setLogedIn(true);
                console.log(result.user.displayName);
                return true;
            }
        }).catch(function (error: any) {
            return error;
        });
    }

    signOut(): any {
        firebase.auth().signOut().then(function () {
            return true;
        }, function (error: any) {
            return error;
        });
    }

    onAuthStateChanged(user: any): void {
        console.log('firebaseservice: onAuthStateChanged');
        if (user) {
            this.user.setUser(user);
            this.user.setLogedIn(true);
            this.router.navigate(['/dashboard']);
            this.userToDatabase();
        } else {
            this.user.setLogedIn(false);
            this.router.navigate(['/login']);
        }
    }

    /*
        @Deprecated
    */
    getEventList(): void {
        console.log('firebaseservice: getEvent');
        console.log('database connect ');
        console.log(this.user.getUser().uid);
        let database = firebase.database().ref('/USER/' + this.user.getUser().uid + '/EVENTLIST/');
        console.log('getData function ');
        console.log('database.on');
        this.events.clear();
        let tevents = this.events;
        database.once('value', function (snap: any) {
            snap.forEach(function (child: any) {
                let t: Event = new Event(child.val().TITEL);
                console.log(child.key);
                console.log(child.val());
                t.setKey(child.key);
                tevents.addEvent(t);
            });
        });
        console.log('getEvent finished ');
    }

    getEventData(key: string): Promise<Event> {
        let database = firebase.database().ref('EVENT/' + key);
        return database.once('value');
    }

    //UID als Pfad und nicht email, da ein Pfad keine Punkt enthalten darf, die Email aber schon
    userToDatabase(): void {
        console.log('firebaseservice: userToDatabase');
        let database = firebase.database().ref('/USER/' + this.user.getUser().uid);
        let email = this.user.getUser().email;
        let tempEvents = this.events;
        let checkUser = function (snap: any) {
            if (!snap.exists()) {
                console.log('no user in databse - create...');
                database.set({
                    EMAIL: email
                });
                console.log('user set in database');
            } else {
                console.log('user in databse');
                //tempEvents.clear();
                let tempList: Event[] = []
                for (let key in snap.val().EVENTLIST) {
                    let t: Event = new Event(snap.val().EVENTLIST[key]);
                    t.setKey(key);
                    console.log(snap.val());
                    tempList.push(t);
                }
                tempEvents.setEventList(tempList);
            }
        }
        database.on('value', checkUser);
        console.log('userToDatabse finished');
    }

    createEvent(e: Event): void {
        console.log('firebaseservice: createEvent');
        let eventData = {
            AUTHOR: e.author,
            TITEL: e.titel,
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
        updates['/USER/' + this.user.getUser().uid + '/EVENTLIST/' + newEventKey] = e.getTitle();
        console.log(updates);
        firebase.database().ref().update(updates);

        this.addMemberToEvent(newEventKey, e.titel, e.member);

        console.log('createEvent finished');
    }

    addMemberToEvent(ekey: string, eTitle: string, member: string[]): void {
        console.log("firebaseservice addMemberToEvent");
        let update = {};
        let counter:number = 0;
        for (let m in member) {
            let database = firebase.database().ref("/USER/").orderByChild("EMAIL").equalTo(member[m]);
            database.once('value').then(function (snap: any) {
                if (snap != null) {
                    for (let n in snap.val()) {
                        console.log(n);
                        update['/USER/'+n+'/EVENTLIST/'+ekey] = eTitle;
                    }
                }
                counter++;
                if(counter===member.length){
                    firebase.database().ref().update(update);
                }
            });
        }
        console.log("do update");
    }
}