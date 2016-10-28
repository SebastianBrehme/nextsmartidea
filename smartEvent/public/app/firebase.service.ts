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
        if (user) {
            console.log('dashboard');
            this.user.setUser(user);
            this.user.setLogedIn(true);
            this.router.navigate(['/dashboard']);
        } else {
            this.router.navigate(['/login']);
        }
    }
}