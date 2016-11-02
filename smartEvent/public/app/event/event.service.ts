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

    getEventList():Event[]{
       return this.eventdata.getEventList();
    }

    getEvent(id:string):Event{
        return null;
    }

    createEvent(title:string){

    }

    deleteEvent(id:string):void{

    }

    updateEvent(id:string,data:Object):void{

    }

}