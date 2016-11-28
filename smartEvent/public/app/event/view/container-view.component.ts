import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import { Router } from '@angular/router';
import { UserService} from '../../user.service';
import { EventService} from '../event.service';
import { Event } from '../event';

@Component({
    moduleId: module.id,
    selector: 'container-view',
    templateUrl: 'container-view.component.html',
    styleUrls: [ 'container-view.component.css' ]
})

export class ContainerViewComponent{

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

    doEvent():void{
        console.log('init');
        console.log(this.updateList);
       
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