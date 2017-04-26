import { Component, OnInit, OnChanges, ApplicationRef, Input, Output } from '@angular/core';
import { EventService} from '../event.service';
import { Event } from '../event';
import { Message } from './message';
import { UserService } from '../../user.service';

@Component({
    moduleId: module.id,
    selector: 'chat',
    templateUrl: 'chat.component.html'
})

export class ChatComponent implements OnInit{

    event:Event;

    @Input() eventKey: string;

    messageList: Array<Message> = [];
    messageListReverse: Array<Message> = [];
    currentMessageString: string = "";


    constructor(
        private eventService: EventService,
        private ref: ApplicationRef,
        private userService: UserService,
    ) {
        
    }

    ngOnInit(): void {
    
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    onSendClicked(){
        console.log(this.userService.getUser().email);
        let email: string = this.userService.getUser().email;
        this.messageList.unshift(new Message(this.currentMessageString, email));
        let messageListTemp = this.messageList;
       // messageListTemp.reverse();
        this.messageListReverse = messageListTemp;
        this.currentMessageString = "";
    }

}