import {Component,OnInit} from '@angular/core';
import {FirebaseService} from './firebase.service';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent{



    constructor(
        private firebase: FirebaseService,
        private router: Router,
        ){}

    doLogin():void{
       let response = this.firebase.signIn();
       if(true){
           // this.router.navigate(['/dashboard']);    
       }else{
           //Fehler anzeigen
       }
    }

}