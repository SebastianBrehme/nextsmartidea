import { Component } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';
import { UserService} from './user.service';
import { EventService} from './event/event.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {


    constructor(
        private firebase: FirebaseService,
        private router: Router,
        private user: UserService,
        private event: EventService,
    ) { }


    doLogout(): void {
        let result = this.firebase.signOut();
        if(result == true){
        }else{
            //Todo Fehler anzeigen
        }
    }

    doEvent(): void{
        console.log('dashboard: doEvent');
        //this.firebase.getEventData('-KVWYeXYJ2YXsdANQwuL');
        console.log(this.event.getEventList());
    }
}