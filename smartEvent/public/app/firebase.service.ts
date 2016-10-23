import { Injectable } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';

declare var firebase: any;

@Injectable()
export class FirebaseService {

    auth: any;
    user: User;

    constructor(
        private router: Router,
    ) { 
         firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
         console.log('constructor');
    }

    signIn(): any {
        console.log('signin');
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then(function (result: any) {
            if (result.credential) {
                let token = result.credential.accessToken;
                this.user.setUser(result.user);
                this.user.setLogedIn(true);
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
        if (user) {
            console.log('dashboard');
            this.router.navigate(['/dashboard']);
        } else {
            this.router.navigate(['/login']);
        }
    }
}