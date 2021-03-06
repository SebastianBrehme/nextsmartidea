import {Component,OnInit,OnChanges} from '@angular/core';
import {FirebaseFacade} from './firebase/firebase.service';
import {Router} from '@angular/router';
import { UserService} from './user.service';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit{



    constructor(
        private firebase: FirebaseFacade,
        private router: Router,
        public user: UserService,
        ){}

    ngOnInit() { 
        if(this.user.isLogedIn()){
            this.router.navigate(['']);
        }else{
            //Do nothing
        }
    }

    doLogin():void{
       this.firebase.signIn();
    }

   }