import {Injectable} from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
declare var firebase: any;

@Injectable()
export class FirebaseAuthService{

    auth: any;

    constructor(
        private router: Router,
        private user: UserService,
    ) {
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));
    }

    signIn(): any {
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider).then((result:any)=> {
            
            if (result.credential) {
                // Attention: This code is never executed, because result is undefined.....
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

    private onAuthStateChanged(user: any): void {
        if (user) {
            this.user.setUser(user);
            this.user.setLogedIn(true);
            this.putUserToDatabase();
            this.router.navigate(['']);
        } else {
            this.user.setLogedIn(false);
            this.router.navigate(['']);
        }
    }

    // UID als Pfad und nicht email, da ein Pfad keine Punkt enthalten darf, die Email aber schon
    private putUserToDatabase(): void {
        let database = firebase.database().ref('/USER/' + this.user.getUser().uid);
        let email = this.user.getUser().email;
        let checkUser = function (snap: any) {
            if (!snap.exists()) {
                database.set({
                    EMAIL: email
                });
            } 
        }
        database.once('value', checkUser);
    }
}
