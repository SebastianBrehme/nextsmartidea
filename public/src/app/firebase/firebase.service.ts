import { Injectable } from '@angular/core';
import { Event } from '../event/event';
import { Member} from '../event/member';
import { Survey} from '../event/survey/survey';
import { Answer} from '../event/survey/answer';
import { Message} from '../event/chat/message';
import { FirebaseAuthService} from './firebase-auth.service';
import { FirebaseEventService} from './firebase-event.service';
import { FirebaseSurveyService} from './firebase-survey.service';
import { FirebaseChatService} from './firebase-chat.service';

declare var firebase: any;

@Injectable()
export class FirebaseService{

    constructor(
        private fauth: FirebaseAuthService,
        private fevent: FirebaseEventService,
        private fsurvey: FirebaseSurveyService,
        private fchat: FirebaseChatService
    ) {}

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

    createSurvey(sur:Survey, ekey:string){
        this.fsurvey.createSurvey(sur,ekey);
    }

    deleteSurvey(key:string, ekey:string){
        this.fsurvey.deleteSurvey(key, ekey);
    }

    vote(ekey:string,skey:string,answerkey:string, member:Member){
        this.fsurvey.vote(ekey,skey,answerkey,member);
    }

    unvote(ekey:string,skey:string,answerkey:string, member:Member){
        this.fsurvey.unvote(ekey,skey,answerkey,member);
    }

    pushMessage(key:string, msg:Message):void{
        this.fchat.pushMessage(key, msg);
    }

    getMessages(key:string, limit:number, callback:any){
        this.fchat.getMessages(key, limit, callback);
    }

    getMessagesOff(key:string){
        this.fchat.getMessagesOff(key);
    }

    createNewChatKey():string{
       return this.fchat.createNewChatKey();
    }
}