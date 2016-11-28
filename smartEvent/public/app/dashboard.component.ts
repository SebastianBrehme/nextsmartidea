import { Component, OnInit, ChangeDetectorRef} from '@angular/core';
import { EventService} from './event/event.service';
import { Event } from './event/event';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: [ 'dashboard.component.css']
})

export class DashboardComponent{

    eventList:Event[];

    showEvents: boolean = false;

    constructor(
        private event: EventService,
        private ref: ChangeDetectorRef,
    ) {}

    ngOnInit(){
        this.eventList =[];
         this.event.getEventList(this.updateList);
       
    }
    
    customTrackBy(index: number, obj: any): any {
        return index;
    }

    updateList = (list:Event[]) => {
        console.log('update: '+list);
        this.eventList = list;
        this.showEvents = true;
        this.ref.markForCheck();
        this.ref.detectChanges();
    }

    doEvent(): void{
        console.log('dashboard: doEvent');
    }
}