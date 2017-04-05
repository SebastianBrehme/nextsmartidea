import { Component, OnInit, OnDestroy, ApplicationRef, ChangeDetectionStrategy} from '@angular/core';
import { EventService} from './event/event.service';
import { Event } from './event/event';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: [ 'dashboard.component.css']
})

export class DashboardComponent implements OnDestroy{

    eventList:Event[];

    showEvents: boolean = false;

    constructor(
        private event: EventService,
        private ref: ApplicationRef,
    ) {}

    ngOnInit(){
        this.eventList =[];
        this.event.getEventList(this.updateList);
       
    }

    ngOnDestroy(){
        //this.event.removeCallback(this.updateList);
    }

    
    customTrackBy(index: number, obj: any): any {
        return index;
    }

    updateList = (list:Event[]) => {
        if(this && this.ref){
        console.log('update: '+list);
        this.eventList = list;
        this.showEvents = true;
        this.ref.tick()
        
        }
    }

    doEvent(): void{
        console.log('dashboard: doEvent');
        
    }

    deleteButtonClicked(key?:any){
        console.log("deleteButtonClicked: key: " + key);
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        this.event.deleteEvent(key);
    }
}