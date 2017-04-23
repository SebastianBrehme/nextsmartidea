import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { Event } from '../event/event';
import { Member} from '../event/member';
import { Router } from '@angular/router';
import { FirebaseAuthService} from './firebase-auth.service';
import { FirebaseEventService} from './firebase-event.service';

declare var firebase: any;

@Injectable()
export class FirebaseService{

    //auth: any;

    constructor(
        private router: Router,
        private user: UserService,
        private fauth: FirebaseAuthService,
        private fevent: FirebaseEventService
    ) {
        console.log('constructor [firebase service]');
    }

    signIn():any{
        this.fauth.signIn();
    }

    signOut():any{
        this.fauth.signOut();
    }

   //TODO callback is a function, use interface(?)
    getEventList(callback:any): void {
        this.fevent.getEventList(callback);
    }

    getEventData(key: string, callback: any): void {
        this.fevent.getEventData(key, callback);
    }

    deleteEvent(key:string,author:boolean,member:Member[]){
        this.fevent.deleteEvent(key, author, member);
    }

    doOffEvent(key:string){
        this.fevent.doOffEvent(key);
    }

    doOffCallback(callback:any){
        this.fevent.doOffCallback(callback);
    }  
    

    createEvent(e: Event): void {
        this.fevent.createEvent(e);
    }

    updateEvent(newEvent: Event,oldEvent:Event): void {
       this.fevent.updateEvent(newEvent, oldEvent);
    }

    addMemberToEvent(ekey: string, eTitle: string, member: Member[]): void {
        this.fevent.addMemberToEvent(ekey, eTitle, member);
    }

}