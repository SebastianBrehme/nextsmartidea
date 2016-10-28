import {Component,OnInit,OnChanges} from '@angular/core';
import {FirebaseService} from './firebase.service';
import {Router} from '@angular/router';
import { UserService} from './user.service';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit{



    constructor(
        private firebase: FirebaseService,
        private router: Router,
        private user: UserService,
        ){}

    ngOnInit() { 
        if(this.user.isLogedIn()){
            this.router.navigate(['/dashboard']);
        }else{
            //Do nothing
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

}