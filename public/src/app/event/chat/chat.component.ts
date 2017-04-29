import { Component, OnInit,AfterViewChecked, OnChanges, ApplicationRef, Input, Output, NgZone } from '@angular/core';
import { EventService} from '../event.service';
import { ChatService} from './chat.service';
import { Event } from '../event';
import { Message } from './message';
import { UserService } from '../../user.service';

@Component({
    moduleId: module.id,
    selector: 'chat',
    templateUrl: 'chat.component.html',
    styleUrls: [ 'chat.component.css']
})

export class ChatComponent implements OnInit, AfterViewChecked{

    //event:Event;
    @Input() chatKey: string;

    messageList: Array<Message> = [];
    messageListReverse: Array<Message> = [];
    currentMessageString: string = "";

    //workaround
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
    }

    ngAfterViewChecked():void{
        if(this.chatKey && this.first){
            this.first = false;
            this.chatService.getMessage(this.chatKey,50);
            this.chatService.getListAsReplaySubject().subscribe(msg =>{
                this.zone.run(() => {
                    if(this && this.ref){
                        this.messageListReverse = msg;
                    }
                });
            });
        }
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    onSendClicked(){
        //console.log(this.userService.getUser().email);
        let email: string = this.userService.getUser().email;

        /*Robin
        this.messageList.unshift(new Message(this.currentMessageString, email));
        let messageListTemp = this.messageList;
       // messageListTemp.reverse();
        this.messageListReverse = messageListTemp;
        this.currentMessageString = "";
        */

        //modified by Fabian
        let msg:Message = new Message(this.currentMessageString, email);
        this.currentMessageString = "";
        this.chatService.pushMessage(this.chatKey, msg);
    }

}