import { Injectable } from '@angular/core';
import { Event } from '../event/event';
import { Member} from '../event/member';
import { Survey} from '../event/survey/survey';
import { Answer} from '../event/survey/answer';
import { Message} from '../event/chat/message';
import { Task} from '../event/task/task';
import { SubTask} from '../event/task/subTask';
import { FirebaseAuthService} from './firebase-auth.service';
import { FirebaseEventService} from './firebase-event.service';
import { FirebaseSurveyService} from './firebase-survey.service';
import { FirebaseChatService} from './firebase-chat.service';
import { FirebaseTaskService} from './firebase-task.service';

declare var firebase: any;

@Injectable()
export class FirebaseFacade{

    constructor(
        private fauth: FirebaseAuthService,
        private fevent: FirebaseEventService,
        private fsurvey: FirebaseSurveyService,
        private fchat: FirebaseChatService,
        private ftask: FirebaseTaskService
    ) {}

    signIn():any{
        this.fauth.signIn();
    }

    signOut():any{
        this.fauth.signOut();
    }

    getEventList(callback:any): void {
        this.fevent.getEventList(callback);
    }

    getEventData(key: string, callback: any): void {
        this.fevent.getEventData(key, callback);
    }

    deleteEvent(key:string,author:boolean,member:Member[]): void{
        this.fevent.deleteEvent(key, author, member);
    }

    doOffEvent(key:string): void{
        this.fevent.doOffEvent(key);
    }

    doOffCallback(callback:any): void{
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

    createSurvey(sur:Survey, ekey:string): void{
        this.fsurvey.createSurvey(sur,ekey);
    }

    deleteSurvey(key:string, ekey:string): void{
        this.fsurvey.deleteSurvey(key, ekey);
    }

    vote(ekey:string,skey:string,answerkey:string, member:Member): void{
        this.fsurvey.vote(ekey,skey,answerkey,member);
    }

    unvote(ekey:string,skey:string,answerkey:string, member:Member,set:boolean): void{
        this.fsurvey.unvote(ekey,skey,answerkey,member,set);
    }

    pushMessage(key:string, msg:Message):void{
        this.fchat.pushMessage(key, msg);
    }

    getMessages(key:string, limit:number, callback:any): void{
        this.fchat.getMessages(key, limit, callback);
    }

    getMessagesOff(key:string): void{
        this.fchat.getMessagesOff(key);
    }

    createNewChatKey():string{
       return this.fchat.createNewChatKey();
    }

    createTask(task:Task,ekey:string): void{
        this.ftask.createTask(task,ekey);
    }

    deleteSubTask(ekey:string, tkey:string,skey:string): void{
        this.ftask.deleteSubTask(ekey, tkey, skey);
    }

    addSubTask(ekey:string, tkey:string, subtask:SubTask): void{
        this.ftask.addSubTask(ekey, tkey, subtask);
    }

    checkDone(ekey:string, tkey:string, stkey:string, done:boolean): void{
       this.ftask.checkDone(ekey, tkey, stkey, done);
    }

    setWho(ekey:string, tkey:string, stkey:string, who:string): void{
        this.ftask.setWho(ekey, tkey, stkey, who);
    }
}