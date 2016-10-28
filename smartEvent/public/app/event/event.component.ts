import {Component,OnInit} from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'event',
    templateUrl: 'event.component.html'
})

export class EventComponent{



    constructor(
        private firebase: FirebaseService,
        private router: Router,
        ){}

    

}