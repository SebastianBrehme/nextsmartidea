import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'contact',
    templateUrl: 'contact.component.html'
})

export class ContactComponent{

    constructor(
        private router: Router,
        ){}

}