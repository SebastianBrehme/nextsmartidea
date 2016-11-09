import {Event} from './event';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class EventDataService{
    eventlistSubject:BehaviorSubject<Event[]>;
    constructor(){
        this.eventlistSubject =  new BehaviorSubject<Event[]>([]);
    }

    getEventListSubject():BehaviorSubject<Event[]>{
        return this.eventlistSubject;
    }

    getEventList():Event[]{
        return this.eventlistSubject.getValue();
    }

    addEvent(e:Event):void{
        let temp = this.eventlistSubject.getValue();
        temp.push(e);
        this.eventlistSubject.next(temp);
    }

    setEventList(e:Event[]):void{
        this.eventlistSubject.next(e);
    }

    clear():void{
        this.eventlistSubject.next([]);
    }
}