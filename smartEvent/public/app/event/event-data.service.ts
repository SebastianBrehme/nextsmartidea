import {Event} from './event';
import {Subject} from 'rxjs/Subject';

export class EventDataService{
    eventlist:Event[];
    test =new Subject<string>();
    constructor(){
        this.eventlist = [];
        this.test.next("sowas");
    }

    getEventList():Event[]{
        return this.eventlist;
    }

    addEvent(e:Event):void{
        this.eventlist.push(e);
    }

    setEventList(e:Event[]):void{
        this.eventlist = e;
    }

    clear():void{
        this.eventlist.length = 0;
    }
}