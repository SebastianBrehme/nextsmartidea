import {Component,OnInit} from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'create-event',
    templateUrl: 'create-event.component.html'
})

export class CreateEventComponent implements OnInit{

    

    constructor(
        private firebase: FirebaseService,
        private router: Router,
        ){}

    ngOnInit() { 
    }
    
    onAddInviteClicked(){
    }

    

}