import {Component,OnInit,OnChanges, AfterContentChecked} from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from './firebase.service';
import { UserService } from './user.service';

@Component({
    moduleId: module.id,
    selector: 'nav-bar',
    templateUrl: 'nav-bar.component.html',
    styleUrls: ['nav-bar.component.css']
})

export class NavBarComponent implements OnInit,OnChanges,AfterContentChecked{

    loggedIn: boolean = false;

    constructor(
        private firebase: FirebaseService,
        private router: Router,
        private user: UserService,
        ){}

    ngOnInit() { 
        this.checkLoggedIn();
    }

    ngAfterContentChecked(){
        this.checkLoggedIn();
    }

    ngOnChanges() { 
        this.checkLoggedIn();
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
    }

    checkLoggedIn(): void{
        if(this.user.isLogedIn()){
            this.loggedIn = this.user.isLogedIn() 
        }else{
            this.loggedIn = false;
        }
    }
    
    onCreateEventClicked():void{
        this.router.navigate(['/event']);
    }

    onJoinEventClicked():void{
        this.router.navigate(['/event']);
    }

    onBrandClicked():void{ //onSmartEventClicked
        this.router.navigate(['/']);
    }

    onContactClicked():void{
        this.router.navigate(['/contact']);
    }
}