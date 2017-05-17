import {Component,OnInit, ApplicationRef} from '@angular/core';
import { SidebarContentComponent } from './sidebar/sidebar-content.component';
import { UserService} from './user.service';
import { SidebarModule } from 'ng-sidebar';


@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: [ 'app.component.css']
  })
export class AppComponent implements OnInit{ 
    _open: boolean = false;
    loggedIn: boolean = false;

    constructor(
        private user: UserService,
        private ref: ApplicationRef,
        ){}
    
    ngOnInit() { 
        //console.log('ngOnInit [app.component]');
        this.user.setLogedInCallback(this.test);
    }


    test = (t:boolean) => {
        //console.log('callback: '+t);
        this.loggedIn = t;
        this.ref.tick();
        
        //console.log("app.component: loggedIN = true");
    }

  _toggleSidebar() {
    this._open = !this._open;
    //console.log("open sidebar");
    this.ref.tick();
  }
  _closeSidebar() {
      this._open = false;
      this.ref.tick();
  }

}
