import {Component,OnInit,OnChanges, AfterContentChecked, ChangeDetectorRef, Input} from '@angular/core';
//import { NavBarComponent } from './nav-bar.component';
//import { UserService } from './user.service';
import { SidebarContentComponent } from './sidebar/sidebar-content.component';
import { UserService} from './user.service';


@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html'
  })
export class AppComponent implements OnInit,OnChanges,AfterContentChecked{ 
    //loggedIn: boolean = false;
    _open: boolean = false;
    loggedIn: boolean = false;

    constructor(
        private user: UserService,
        private ref: ChangeDetectorRef,
        ){}
    
    ngOnInit() { 
        console.log('ngOnInit [app.component]');
        //this.ref.markForCheck();
        //this.checkLoggedIn();
        this.user.setLogedInCallback(this.test);
    }

    ngAfterContentChecked(){
        console.log('ngAfterContentChecked');
        //this.checkLoggedIn();
    }

    ngOnChanges() { 
        console.log('ngOnChanges');
        //this.checkLoggedIn();
    }


    test = (t:boolean) => {
        console.log('callback: '+t);
        this.loggedIn = t;
        this.ref.markForCheck();
        this.ref.detectChanges();
        console.log("app.component: loggedIN = true");
    }

    
        
/*
    constructor(
        private user: UserService,
        ){}
*/
    
  _toggleSidebar() {
    this._open = !this._open;
  }
/*
    checkLoggedIn(): void{
        if(this.user.isLogedIn()){
            this.loggedIn = this.user.isLogedIn() 
        }else{
            this.loggedIn = false;
        }
    }
    */
}
