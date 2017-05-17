import {Injectable, Output, EventEmitter} from '@angular/core';
import {FirebaseFacade} from '../../firebase/firebase.service';
import {Message} from './message';
import {ReplaySubject} from 'rxjs';

@Injectable()
export class ChatService{

    chatlist:ReplaySubject<Message[]>;
    @Output() chatKeyChangedEvent: EventEmitter<string> = new EventEmitter();

    constructor(
        private firebase: FirebaseFacade
    ){
        this.chatlist = new ReplaySubject(1);
    }

    generateKey():string{
        return this.firebase.createNewChatKey();
    }

    pushMessage(key:string, msg:Message){
        this.firebase.pushMessage(key, msg);
    }

    getMessage(key:string, limit:number){
        this.firebase.getMessages(key,limit, data =>{
            data = data.val();
            let msglist:Message[] = [];
            for(let msg in data){
                msglist.unshift(new Message(data[msg]['MESSAGE'],data[msg]['AUTHOR']));
            }
            this.chatlist.next(msglist);
        })
    }

    getListAsReplaySubject():ReplaySubject<Message[]>{
        return this.chatlist;
    }
}