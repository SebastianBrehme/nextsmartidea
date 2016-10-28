import {Component,OnInit,OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from './firebase.service';
import { UserService } from './user.service';

@Component({
    moduleId: module.id,
    selector: 'nav-bar',
    templateUrl: 'nav-bar.component.html',
})

export class NavBarComponent implements OnInit,OnChanges{

    loggedIn: boolean = false;

    constructor(
        private firebase: FirebaseService,
        private router: Router,
        private user: UserService,
        ){}

    ngOnInit() { 
        if(this.user.isLogedIn()){
            this.loggedIn = this.user.isLogedIn() 
        }else{
            this.loggedIn = false;
        }
    }

    ngOnChanges() { 
        if(this.user.isLogedIn()){
            this.loggedIn = this.user.isLogedIn() 
        }else{
            this.loggedIn = false;
        } 
    }

    doLogin():void{
       let response = this.firebase.signIn();
       if(true){
           // this.router.navigate(['/dashboard']);    
       }else{
           //Fehler anzeigen
       }
    }

    doLogout(): void {
        let result = this.firebase.signOut();
        if(result == true){
            this.user.setLogedIn(false);
            this.router.navigate(['/login']);
        }else{
            //Todo Fehler anzeigen
        }
    }
    
}