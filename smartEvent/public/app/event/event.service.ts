import { Injectable } from '@angular/core';

import { Event } from './event';
import { FirebaseService } from '../firebase.service';
import { EventDataService} from './event-data.service';

@Injectable()
export class EventService{

    constructor(
        private firebase: FirebaseService,
        private eventdata: EventDataService,
    ){}

    addEvent(e:Event):void{
       this.eventdata.addEvent(e);
    }

    setEventList(e:Event[]):void{
       this.eventdata.setEventList(e);
    }

    getEventList():void{//:Event[]{
       //return this.eventdata.getEventList();
       this.firebase.getEventList();
    }

    getEvent(id:string):Promise<Event>{
        return this.firebase.getEventData(id)
        .then(function(snap:any){return new Event(snap.val(),snap.key);});
    }

    createEvent(title:string){

    }

    deleteEvent(id:string):void{

    }

    updateEvent(id:string,data:Object):void{

    }

}