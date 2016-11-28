import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
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
        private ref: ChangeDetectorRef,
    ) {}

    ngOnInit(){
        this.eventlist =[];
        this.event.getEventList(this.updateList);
    }
    ngAfterViewChecked(){
        //this.updateList();
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

   updateList = (list:Event[]) => {
        console.log('update: '+list);
        this.eventlist = list;
        this.showEvents = true;
        this.ref.markForCheck();
        this.ref.detectChanges();
    }

    
}