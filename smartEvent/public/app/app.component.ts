import {Component,OnInit, ChangeDetectorRef} from '@angular/core';
import { SidebarContentComponent } from './sidebar/sidebar-content.component';
import { UserService} from './user.service';


@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html'
  })
export class AppComponent implements OnInit{ 
    _open: boolean = false;
    loggedIn: boolean = false;

    constructor(
        private user: UserService,
        private ref: ChangeDetectorRef,
        ){}
    
    ngOnInit() { 
        console.log('ngOnInit [app.component]');
        this.user.setLogedInCallback(this.test);
    }


    test = (t:boolean) => {
        console.log('callback: '+t);
        this.loggedIn = t;
        this.ref.markForCheck();
        this.ref.detectChanges();
        console.log("app.component: loggedIN = true");
    }

  _toggleSidebar() {
    this._open = !this._open;
  }

}
