import { Component } from '@angular/core';
import { NavBarComponent } from './nav-bar.component';
import { UserService } from './user.service';


@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html'
  })
export class AppComponent { 
    loggedIn: boolean = false;

    constructor(
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

    checkLoggedIn(): void{
        if(this.user.isLogedIn()){
            this.loggedIn = this.user.isLogedIn() 
        }else{
            this.loggedIn = false;
        }
    }
}
