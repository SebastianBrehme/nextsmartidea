import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from './../firebase.service';
import { Router } from '@angular/router';
import { UserService} from './../user.service';
import { EventService} from '../event/event.service';
import { Event } from '../event/event';

@Component({
    moduleId: module.id,
    selector: 'sidebar-content',
    templateUrl: 'sidebar-content.component.html',
})

export class SidebarContentComponent{

    eventlist:Event[];

    showEvents: boolean = false;

    constructor(
        private firebase: FirebaseService,
        private router: Router,
        private user: UserService,
        private event: EventService,
    ) {}

    ngOnInit(){
        this.eventlist =[];
        this.updateList();
    }
    ngAfterViewChecked(){
        this.updateList();
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

   updateList():void{
      //  this.eventdata.getEventListSubject().asObservable().subscribe(list => this.eventlist = list);
        //this.showEvents = true;
    }

    
}