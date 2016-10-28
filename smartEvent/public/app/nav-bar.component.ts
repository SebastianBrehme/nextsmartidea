import {Component,OnInit,OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from './firebase.service';
import {User} from './user';

@Component({
    moduleId: module.id,
    selector: 'nav-bar',
    templateUrl: 'nav-bar.component.html',
})

export class NavBarComponent implements OnInit,OnChanges{

    loggedIn: any = false;

    constructor(
        private firebase: FirebaseService,
        private router: Router,
        ){}

    ngOnInit() { this.loggedIn = this.firebase.user.logedIn }

    ngOnChanges() { this.loggedIn = this.firebase.user.logedIn }

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
            this.router.navigate(['/login']);
        }else{
            //Todo Fehler anzeigen
        }
    }
    
}