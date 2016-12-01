import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Event } from './event/event';
import { Router } from '@angular/router';

declare var firebase: any;

@Injectable()
export class FirebaseService{

    auth: any;

    constructor(
        private router: Router,
        private user: UserService,
    ) {
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
        console.log('constructor');
    }

    signIn(): any {
        console.log('signin');
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then((result:any)=> {
            
            console.log('signedin '+result);
            if (result.credential) {
                //Attention: This code is never executed, because result is undefined.....
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
            console.log('logged in true');
            this.user.setLogedIn(true);
            this.putUserToDatabase();
            console.log(this.user.isLogedIn());
            this.router.navigate(['/dashboard']);
        } else {
            this.user.setLogedIn(false);
            this.router.navigate(['/login']);
        }
    }

   //TODO callback is a function, use interface(?)
    getEventList(callback:any): void {
        console.log('firebaseservice: getEventist');
        console.log(this.user.getUser().uid);
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

    //UID als Pfad und nicht email, da ein Pfad keine Punkt enthalten darf, die Email aber schon
    putUserToDatabase(): void {
        console.log('firebaseservice: putUserToDatabase');
        let database = firebase.database().ref('/USER/' + this.user.getUser().uid);
        let email = this.user.getUser().email;
        let checkUser = function (snap: any) {
            if (!snap.exists()) {
                console.log('no user in databse - create...');
                database.set({
                    EMAIL: email
                });
                console.log('user set in database');
            } 
        }
        database.once('value', checkUser);
        console.log('userToDatabse finished');
    }

    createEvent(e: Event, key?: string): void {
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
        let newEventKey = '';
        if (key) {
            newEventKey = key;
        } else {
            newEventKey = firebase.database().ref('/EVENT/').push().key;
            console.log(newEventKey);
        }
        let updates = {};
        updates['/EVENT/' + newEventKey] = eventData;
        updates['/USER/' + this.user.getUser().uid + '/EVENTLIST/' + newEventKey] = e.getTitle();
        console.log(updates);
        firebase.database().ref().update(updates);

        this.addMemberToEvent(newEventKey, e.titel, e.member);

        console.log('createEvent finished');
        //alert('submit succeeded');
    }

    updateEvent(e: Event): void {
        if (e.key != '') {
            this.createEvent(e, e.key);
        }
    }

    addMemberToEvent(ekey: string, eTitle: string, member: string[]): void {
        console.log("firebaseservice addMemberToEvent");
        let update = {};
        let counter: number = 0;
        for (let m in member) {
            let database = firebase.database().ref("/USER/").orderByChild("EMAIL").equalTo(member[m]);
            database.once('value').then(function (snap: any) {
                if (snap != null) {
                    for (let n in snap.val()) {
                        console.log(n);
                        update['/USER/' + n + '/EVENTLIST/' + ekey] = eTitle;
                        update['/EVENT/' + ekey + '/MEMBER/'+ n] = member[m];
                    }
                }
                counter++;
                if (counter === member.length) {
                    firebase.database().ref().update(update);
                }
            });
        }
        console.log("do update");
    }
}