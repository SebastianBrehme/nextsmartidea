import { Component, OnInit, OnDestroy, NgZone,ApplicationRef, ChangeDetectionStrategy} from '@angular/core';
import { EventService} from './event/event.service';
import { Event } from './event/event';
import { Subscription} from 'rxjs';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: [ 'dashboard.component.css']
})

export class DashboardComponent implements OnDestroy{

    eventList:Event[];
    listSubjectSubscribtion:Subscription;
    showEvents: boolean = false;

    constructor(
        private event: EventService,
        private ref: ApplicationRef,
        private zone: NgZone
    ) {}

    ngOnInit(){
        this.eventList =[];
        //this.event.getEventList(this.updateList);
        this.event.getEventList();
        this.listSubjectSubscribtion = this.event.getListAsReplaySubject().subscribe(list =>{
            console.log("new input here");
            this.zone.run(() => {
                if(this && this.ref){
                    console.log("dashboard component subscribe");
                    console.log(list);
                    for(let k in list){
                        console.log(list[k]);
                    }
                    this.eventList = list;
                    this.showEvents = true;
                //this.ref.tick();
                }
            });            
        });
       
    }

    ngOnDestroy(){
        //this.event.removeCallback(this.updateList);
        if(this.listSubjectSubscribtion){
            console.log("eins");
            if(typeof this.listSubjectSubscribtion != "undefined"){
                console.log("zwei");
                if(!this.listSubjectSubscribtion.closed){
                    console.log("drei - unsubscribe");
                    this.listSubjectSubscribtion.unsubscribe();
                }  
            }
        }
        
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