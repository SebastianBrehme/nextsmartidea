import {Event} from './event';

export class EventDataService{
    eventlist:Event[] = [];

    getEventList():Event[]{
        return this.eventlist;
    }

    addEvent(e:Event):void{
        this.eventlist.push(e);
    }

    setEventList(e:Event[]):void{
        this.eventlist = e;
    }
}