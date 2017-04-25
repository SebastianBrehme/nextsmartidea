import { Injectable } from '@angular/core';
import { FirebaseService } from '../../firebase/firebase.service';
import { Survey } from './survey';
import { Answer } from './answer';
import { Member } from '../member';

@Injectable()
export class SurveyService{
    
    constructor(
        private firebase:FirebaseService){}

    createSurvey(sur:Survey, ekey:string){
        this.firebase.createSurvey(sur,ekey);
    }

    deleteSurvey(key:string, ekey:string){
        this.firebase.deleteSurvey(key, ekey);
    }

    vote(ekey:string,skey:string,answer:Answer, member:Member){
        this.firebase.vote(ekey,skey,answer.getAnswer(), member);
    }

    unvote(ekey:string,skey:string,answer:Answer, member:Member){
        this.firebase.unvote(ekey, skey, answer.getAnswer(), member);
    }

    convert(data:any):Survey[]{
        let ret:Survey[] = [];
        for(let skey in data){
            let temp:Survey = new Survey(data['TITLE']);
            temp.setKey(skey);
            temp.setQuestion(data['QUESTION']);
            temp.setMultiple(data['MULTIPLE']);
            temp.setAuthor(data['AUTHOR']);

            let answer:Answer[] = [];
            for(let akey in data['ANSWER']){
                let atemp:Answer = new Answer(akey);
                console.log(data['ANSWER'][akey]);
                if(!(data['ANSWER'][akey] instanceof Boolean)){
                    //there are votes
                    console.log('there are votes');
                    let member:Member[] = []
                    for(let mkey in data['ANSWER'][akey]){
                        let mtemp:Member = new Member(data['ANSWER'][akey][mkey],mkey);
                        member.push(mtemp);
                    }
                    atemp.setVotes(member);
                }else{
                    console.log('no votes here');
                }
                answer.push(atemp);
            }
            temp.setAnswers(answer);
            ret.push(temp);
        }
        return ret;
    }

    /*TODO
        get surveys, save them 
        unvote
        single - multiselect

        fix update: event mulipletimes visible
    */
}