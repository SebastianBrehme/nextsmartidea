import {Component,OnInit,OnChanges, AfterContentChecked, ChangeDetectorRef, Input} from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from './firebase.service';
import { UserService } from './user.service';
import { AppComponent } from './app.component';

@Component({
    moduleId: module.id,
    selector: 'nav-bar',
    templateUrl: 'nav-bar.component.html',
    styleUrls: ['nav-bar.component.css']
})

export class NavBarComponent implements OnInit,OnChanges,AfterContentChecked{

    @Input() loggedIn: boolean = false;

    constructor(
        private firebase: FirebaseService,
        private router: Router,
        private user: UserService,
        private appComp: AppComponent,
        private ref: ChangeDetectorRef,
        ){}

    ngOnInit() { 
        console.log('ngOnInit');
        //this.ref.markForCheck();
        //this.checkLoggedIn();
        this.user.isLogedInCallback(this.test);
    }

    test = (t:boolean) => {
        console.log('callback: '+t);
        this.loggedIn = t;
        this.ref.markForCheck();
        this.ref.detectChanges();
    }

    ngAfterContentChecked(){
        console.log('ngAfterContentChecked');
        //this.checkLoggedIn();
    }

    ngOnChanges() { 
        console.log('ngOnChanges');
        //this.checkLoggedIn();
    }

    doLogin():void{
       this.firebase.signIn();
    }

    doLogout(): void {
        this.firebase.signOut();
    }

    checkLoggedIn(): void{
        console.log(this.user.isLogedIn());
        if(this.user.isLogedIn()){
            this.loggedIn = this.user.isLogedIn() 
        }else{
            this.loggedIn = false;
        }
    }
    
    onCreateEventClicked():void{
        this.router.navigate(['/create-event']);
    }

    onJoinEventClicked():void{
        this.router.navigate(['/create-event']);
    }

    onBrandClicked():void{ //onSmartEventClicked
        this.router.navigate(['/']);
    }

    onContactClicked():void{
        this.router.navigate(['/contact']);
    }

    _toggleSidebar() {
        this.appComp._toggleSidebar();
    }
}