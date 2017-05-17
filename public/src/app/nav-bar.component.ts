import {Component,OnInit, ApplicationRef} from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseFacade} from './firebase/firebase.service';
import { UserService } from './user.service';
import { AppComponent } from './app.component';

@Component({
    moduleId: module.id,
    selector: 'nav-bar',
    templateUrl: 'nav-bar.component.html',
    styleUrls: ['nav-bar.component.css']
})

export class NavBarComponent implements OnInit{

    loggedIn: boolean = false;

    constructor(
        private firebase: FirebaseFacade,
        private router: Router,
        private user: UserService,
        private appComp: AppComponent,
        private ref: ApplicationRef,
        ){}

    ngOnInit() { 
        //console.log('ngOnInit');
        this.user.setLogedInCallback(this.test);
    }

    test = (t:boolean) => {
        //console.log('callback: '+t);
        this.loggedIn = t;
        this.ref.tick()
        
    }

    doLogin():void{
       this.firebase.signIn();
    }

    doLogout(): void {
        this.firebase.signOut();
    }
    
    onCreateEventClicked():void{
        this.router.navigate(['/create-event']);
    }

    onJoinEventClicked():void{
        this.router.navigate(['/create-event']);
    }

    onBrandClicked():void{ //onSmartEventClicked
        //console.log("navigate");
        this.router.navigate(['/']);
    }

    onContactClicked():void{
        this.router.navigate(['/contact']);
    }

    _toggleSidebar() {
        this.appComp._toggleSidebar();
    }
}