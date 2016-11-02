import {Component,OnInit} from '@angular/core';
import {FirebaseService} from '../firebase.service';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'create-event',
    templateUrl: 'create-event.component.html'
})

export class CreateEventComponent implements OnInit{

    invitesList: Array<string> = [];
    currentInviteString: string = "";

    constructor(
        private firebase: FirebaseService,
        private router: Router,
        ){}

    ngOnInit() { 
    }
    
    onAddInviteClicked(){
        this.invitesList.push(this.currentInviteString);
        this.currentInviteString = "";
    }

    onDeleteInviteClicked(index: number){
        this.invitesList.splice(index, 1);
    }

    customTrackBy(index: number, obj: any): any {
    return index;
  }
    

}