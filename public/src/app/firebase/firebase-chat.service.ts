import {Injectable} from '@angular/core';
import {Message} from '../event/chat/message';
declare var firebase: any;

@Injectable()
export class FirebaseChatService{

    pushMessage(key:string, msg:Message):void{
        firebase.database().ref('/CHAT/'+key).push({
            AUTHOR: msg.sender,
            MESSAGE: msg.text
        });
    }

    getMessages(key:string, limit:number, callback:any): void{
        firebase.database().ref('/CHAT/'+key).on('value',callback);
    }

    getMessagesOff(key:string): void{
        firebase.database().ref('/CHAT/'+key).off();
    }

    createNewChatKey():string{
       let key:string =  firebase.database().ref('/CHAT/').push().key;
       return key;
    }

}