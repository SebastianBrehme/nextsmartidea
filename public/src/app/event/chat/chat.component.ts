import { Component, OnInit,AfterViewChecked, OnChanges, OnDestroy, ApplicationRef, Input, Output, NgZone, EventEmitter } from '@angular/core';
import { EventService} from '../event.service';
import { ChatService} from './chat.service';
import { Event } from '../event';
import { Message } from './message';
import { UserService } from '../../user.service';
import { Subscription} from 'rxjs';

@Component({
    moduleId: module.id,
    selector: 'chat',
    templateUrl: 'chat.component.html',
    styleUrls: [ 'chat.component.css']
})

export class ChatComponent implements OnInit, OnDestroy{

    chatKey: string;

    messageList: Array<Message> = [];
    messageListReverse: Array<Message> = [];
    currentMessageString: string = "";
    chatKeyChangedSubsciption: Subscription;
    getListAsReplaySubjectSubsciption: Subscription;

    first:boolean;

    constructor(
        private eventService: EventService,
        private ref: ApplicationRef,
        private userService: UserService,
        private chatService: ChatService,
        private zone: NgZone
    ) {
        this.first = true;
    }

    ngOnInit(): void {
        this.chatKeyChangedSubsciption = this.chatService.chatKeyChangedEvent.subscribe((key:string) => {
            this.unsubscribeSubscriptions();
            this.chatKey = key;
            this.initializeChat();
        });
    }

    ngOnDestroy(){
        if(this.chatKeyChangedSubsciption && !this.chatKeyChangedSubsciption.closed){
            this.chatKeyChangedSubsciption.unsubscribe();
        }

        this.unsubscribeSubscriptions();
    }

    unsubscribeSubscriptions(){
        
        if(this.getListAsReplaySubjectSubsciption && !this.getListAsReplaySubjectSubsciption.closed){
            this.getListAsReplaySubjectSubsciption.unsubscribe();            
        }
    }

    

    initializeChat(){
        if(this.chatKey){
            this.chatService.getMessage(this.chatKey,50);
            if(!this.getListAsReplaySubjectSubsciption || this.getListAsReplaySubjectSubsciption.closed){
                this.getListAsReplaySubjectSubsciption = this.chatService.getListAsReplaySubject().subscribe(msg =>{
                this.zone.run(() => {
                    if(this && this.ref){
                        this.messageListReverse = msg;
                    }
                    });
                });

            }
            
        }
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    onSendClicked(){
        let email: string = this.userService.getUser().email;
        let msg:Message = new Message(this.currentMessageString, email);
        this.currentMessageString = "";
        this.chatService.pushMessage(this.chatKey, msg);
    }

}