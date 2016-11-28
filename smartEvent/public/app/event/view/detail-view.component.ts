import { Component, OnInit, Input } from '@angular/core';
//import { FirebaseService } from '../../firebase.service';
import { Router } from '@angular/router';
import { UserService} from '../../user.service';
import { EventService} from '../event.service';
import { Event } from '../event';

@Component({
    moduleId: module.id,
    selector: 'detail-view',
    templateUrl: 'detail-view.component.html'
})

export class DetailViewComponent{

    showEvent: boolean = false;

    constructor(
       // private firebase: FirebaseService,
        private router: Router,
        private user: UserService,
        private event: EventService,
    ) {}

    ngOnInit(){}

    ngAfterViewChecked(){}

}