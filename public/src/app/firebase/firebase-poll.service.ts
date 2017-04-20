import {Injectable} from '@angular/core';
import {Poll} from '../poll/poll';
import {Answer} from '../poll/answer';

declare var firebase:any;

@Injectable()
export class FirebasePollService{

    createPoll(poll:Poll, ekey:string){
        console.log("create a new Poll in Database "+poll);
    }

    deletePoll(key:String, ekey:string){
        console.log("delete poll in database with key: "+key);
    }

    updatePoll(poll:Poll){
        console.log("update poll in database "+poll);
    }

    voteFor(pollkey:String,answer:Answer){
        console.log("voted for "+ answer+" in poll "+pollkey);
    }

}