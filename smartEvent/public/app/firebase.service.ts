import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

declare var firebase: any;

@Injectable()
export class FirebaseService {

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

    getEvent():void{
        console.log('firebaseservice: getEvent');
        console.log('database connect ');
        console.log(this.user.getUser().uid);
        let database = firebase.database().ref('/USER/'+this.user.getUser().uid);
        console.log('getData function ');
        let getData = function(data:any){
            console.log(data);
            console.log(data.val());
        }
        console.log('database.on ');
        database.once('value', getData); 
        console.log('getEvent finished ');
    }

    userToDatabase():void{
        console.log('firebaseservice: userToDatabase');
        let database = firebase.database().ref('/USER/'+this.user.getUser().uid);
        let email = this.user.getUser().email;
        let checkUser = function(snapshot:any){
            if(snapshot.val()==null){
                console.log('no user in databse - create...');
                database.set({
                    EMAIL: email
                });
                console.log('user set in database');
            }else{
                console.log('user in databse');
                console.log(snapshot.val());
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