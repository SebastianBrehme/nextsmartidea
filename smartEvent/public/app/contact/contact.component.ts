import {Component,OnInit} from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'contact',
    templateUrl: 'contact.component.html'
})

export class ContactComponent{

    constructor(
        private firebase: FirebaseService,
        private router: Router,
        ){}

}