import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { EventDataService} from './event/event-data.service';
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
    
    getEventList():void{
        console.log('firebaseservice: getEvent');
        console.log('database connect ');
        console.log(this.user.getUser().uid);
        let database = firebase.database().ref('/USER/'+this.user.getUser().uid+'/EVENTLIST/');
        console.log('getData function ');
        let getData = function(data:any){
            console.log(data);
            console.log(data.val());
            console.log('iterate data');
            data.forEach(function(snap:any){
                console.log(snap);
                console.log(snap.val());
                console.log(snap.key);
            });
        }
        console.log('database.on ');
        database.on('value', getData); 
        console.log('getEvent finished ');
    }

    getEventData(key:string){
        let database = firebase.database().ref('EVENT/'+key);
        let getData = function(data:any){
            console.log(data.val());
        }
        database.once('value',getData);
    }

    userToDatabase():void{
        console.log('firebaseservice: userToDatabase');
        let database = firebase.database().ref('/USER/'+this.user.getUser().uid);
        let email = this.user.getUser().email;
        let tempEvents = this.events;
        let checkUser = function(snapshot:any){
            if(!snapshot.exists()){
                console.log('no user in databse - create...');
                database.set({
                    EMAIL: email
                });
                console.log('user set in database');
            }else{
                console.log('user in databse');
                snapshot.forEach(function(data:any){
                    console.log(data.val());
                    console.log(data.key);
                });

                for(let key in snapshot.val().EVENTLIST){
                    console.log(key);
                    console.log(snapshot.val().EVENTLIST[key]);
                    let ev = new Event();
                    ev.id = key;
                    ev.name = snapshot.val().EVENTLIST[key];
                    tempEvents.addEvent(ev);
                }
            }
        }
        database.once('value').then(checkUser);
        console.log('userToDatabse finished');
    }

    createEvent(titel:string):void{
        console.log('firebaseservice: createEvent');

        let eventData = {
            AUTHOR: this.user.getUser().uid,
            TITEL: titel,
        }
        console.log('create key');
        let newEventKey = firebase.database().ref('/EVENT/').push().key;
        console.log(newEventKey);
        let updates = {};
        updates['/EVENT/'+newEventKey] = eventData;
        updates['/USER/'+this.user.getUser().uid+'/EVENTLIST/'+newEventKey] = true;
        console.log('do update');
        firebase.database().ref().update(updates);
        console.log('createEvent finished');
    }
}