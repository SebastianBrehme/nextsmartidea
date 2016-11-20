import { Component } from '@angular/core';
import { NavBarComponent } from './nav-bar.component';
import { UserService } from './user.service';
import { SidebarContentComponent } from './sidebar/sidebar-content.component';


@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html'
  })
export class AppComponent { 
    loggedIn: boolean = false;
    _open: boolean = false;
    showFloatingButton:boolean = false;

    constructor(
        private user: UserService,
        ){}

    ngOnInit() { 
        this.checkLoggedIn();
        if(window.innerWidth < 768){
            this.showFloatingButton = true;
        }
    }

    ngAfterContentChecked(){
        this.checkLoggedIn();
    }

    ngOnChanges() { 
        this.checkLoggedIn();
        if(window.innerWidth > 767){
            this.showFloatingButton = false;
        }
    }
 
  _toggleSidebar() {
    this._open = !this._open;
  }

    checkLoggedIn(): void{
        if(this.user.isLogedIn()){
            this.loggedIn = this.user.isLogedIn() 
        }else{
            this.loggedIn = false;
        }
    }
}
