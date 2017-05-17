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
    eventMonthLists: EventMonthList[] = [];
    listSubjectSubscribtion:Subscription;
    showEvents: boolean = false;

    constructor(
        private event: EventService,
        private ref: ApplicationRef,
        private zone: NgZone
    ) {}

    ngOnInit(){
        this.eventList =[];
        this.event.getEventList();
        this.listSubjectSubscribtion = this.event.getListAsReplaySubject().subscribe(list =>{
            this.zone.run(() => {
                if(this && this.ref){
                    this.eventList = list;
                    this.makeEventDateShorter();
                    this.eventList.sort(this.compare);
                    this.createDateSeparator();
                    this.showEvents = true;
                }
            });            
        });
       
    }

    ngOnDestroy(){
        //this.event.removeCallback(this.updateList);
        if(this.listSubjectSubscribtion){
            ////console.log("eins");
            if(typeof this.listSubjectSubscribtion != "undefined"){
                ////console.log("zwei");
                if(!this.listSubjectSubscribtion.closed){
                    ////console.log("drei - unsubscribe");
                    this.listSubjectSubscribtion.unsubscribe();
                }  
            }
        }
        
    }

    createDateSeparator(){
        let localEventList: Event[];
        let hit: boolean = false;
        this.eventMonthLists = [];
        for(let event of this.eventList){
            
            for(let eventL of this.eventMonthLists){
                if(eventL.month === this.monthNumberToString(event.date_from.getMonth() + 1) && eventL.year === event.date_from.getFullYear()){
                    eventL.eventList.push(event);
                    hit = true;
                }else{
                    hit = false;
                }
            }
            if(!hit){
                localEventList = [];
                localEventList.push(event);
                this.eventMonthLists.push({eventList: localEventList, month: this.monthNumberToString(event.date_from.getMonth()+1), year: event.date_from.getFullYear()});
            }
        }
        
    }


    monthNumberToString(month:number){
        let b:string;
        switch(month){
        case 1: b = "January";
            break;
        case 2: b = "February";
            break;
        case 3: b = "March";
            break;
        case 4: b = "April";
            break;
        case 5: b = "May";
            break;
        case 6: b = "June"; 
            break;
        case 7: b = "July";
            break;
        case 8: b = "August";
            break;
        case 9: b = "September";
            break;
        case 10: b = "October";
            break;
        case 11: b = "November";
            break;
        case 12: b = "December";
            break;
        }
        return b;
    }


    daydiff(first:any, second:any) {
        return Math.round((second-first)/(1000*60*60*24));
    }
    
    customTrackBy(index: number, obj: any): any {
        return index;
    }
    
    /* OLD AND FATT AND DEPRECATED
    updateList = (list:Event[]) => {
        if(this && this.ref){
        //console.log('updateList -dashboard: '+list);
        this.eventList = list;
        this.showEvents = true;
        this.ref.tick()
        
        }
    }*/

    doEvent(): void{
        //console.log('dashboard: doEvent');
        
    }

    deleteButtonClicked(key?:any){
        //console.log("deleteButtonClicked: key: " + key);
        if (!e) var e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        this.event.deleteEvent(key);
    }

    makeEventDateShorter(){
        for(let event of this.eventList){
                let dateComplete = event.date_from.toDateString();

                let hours:string = event.date_from.getHours().toString();
                let minutes:string = event.date_from.getMinutes().toString();

                if(hours.length < 2){ hours = "0" + hours;}
                if(minutes.length < 2){ minutes = "0" + minutes;}

                dateComplete += " " + hours + ":" + minutes;
                event.date_fromShortString = dateComplete;
            }
    }

    compare(a, b) {
        a = a.date_from;
        b = b.date_from;
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        // a muss gleich b sein
        return 0;
    }
}

interface EventMonthList {
    eventList: Event[];
    month: any;
    year: any;
}