import { Injectable } from '@angular/core';
import { FirebaseService } from '../../firebase/firebase.service';
import { Survey } from './survey';
import { Answer } from './answer';
import { Member } from '../member';
import { UserService } from '../../user.service';

@Injectable()
export class SurveyService{
    
    constructor(
        private firebase:FirebaseService,
        private user:UserService){}

    createSurvey(sur:Survey, ekey:string){
        sur.setAuthor(this.user.getUser().email);
        this.firebase.createSurvey(sur,ekey);
    }

    deleteSurvey(key:string, ekey:string){
        this.firebase.deleteSurvey(key, ekey);
    }

    vote(ekey:string,skey:string,answer:Answer, member:Member){
        this.firebase.vote(ekey,skey,answer.getAnswer(), member);
    }

    unvote(ekey:string,skey:string,answer:Answer, member:Member){
        let set = answer.getVotesCount()==1?true:false;
        this.firebase.unvote(ekey, skey, answer.getAnswer(), member,set);
    }

    convert(data:any):Survey[]{
        //console.log(data);
        let ret:Survey[] = [];
        for(let skey in data){
            let temp:Survey = new Survey(data[skey]['TITEL']);
            temp.setKey(skey);
            temp.setQuestion(data[skey]['QUESTION']);
            temp.setMultiple(data[skey]['MULTIPLE']);
            temp.setAuthor(data[skey]['AUTHOR']);

            let answer:Answer[] = [];
            for(let akey in data[skey]['ANSWER']){
                let atemp:Answer = new Answer(akey);
                //console.log(data[skey]['ANSWER'][akey]);
                if(data[skey]['ANSWER'][akey] instanceof Object){
                    //there are votes
                    //console.log('there are votes');
                    let member:Member[] = []
                    for(let mkey in data[skey]['ANSWER'][akey]){
                        let mtemp:Member = new Member(data[skey]['ANSWER'][akey][mkey],mkey);
                        member.push(mtemp);
                    }
                    atemp.setVotes(member);
                }else{
                    //console.log('no votes here');
                }
                answer.push(atemp);
            }
            temp.setAnswers(answer);
            ret.push(temp);
        }
        //console.log(ret);
        return ret;
    }

    /*TODO
        get surveys, save them 
        unvote
        single - multiselect

        fix update: event mulipletimes visible
    */
}