import { Component } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';
import { User} from './user';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {

    user: User;

    constructor(
        private firebase: FirebaseService,
        private router: Router,
    ) { }


    doLogout(): void {
        let result = this.firebase.signOut();
        if(result == true){
            this.router.navigate(['/login']);
        }else{
            //Todo Fehler anzeigen
        }
    }
}