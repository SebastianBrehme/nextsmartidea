import {Injectable} from '@angular/core';
import {Survey} from '../event/survey/survey';
import {Answer} from '../event/survey/answer';
import {Member} from '../event/member';
declare var firebase:any;

@Injectable()
export class FirebaseSurveyService{

    createSurvey(sur:Survey, ekey:string): void{
        let newSurKey = firebase.database().ref('/EVENT/'+ekey+'/SURVEY/').push().key;

        let surData = {
            AUTHOR: sur.getAuthor(),
            TITEL: sur.getTitle(),
            QUESTION: sur.getQuestion(),
            MULTIPLE: sur.getMultiple()
        };

        let update={}; 
        update['/EVENT/'+ekey+'/SURVEY/'+newSurKey] = surData;
        firebase.database().ref().update(update).then(()=>{
            let updateAnswer = {};
            for(let answer of sur.getAnswers()){
                updateAnswer['/EVENT/'+ekey+'/SURVEY/'+newSurKey+'/ANSWER/'+answer.getAnswer()] = true;
                firebase.database().ref().update(updateAnswer);
            }
        }); 
    }

    deleteSurvey(key:string, ekey:string): void{
        let update = {};
        update['/EVENT/'+ekey+'/SURVEY/'+key] = null;
        firebase.database().update(update);
    }

    vote(ekey:string,skey:string,answerkey:string, member:Member): void{
        let update={};
        update['/EVENT/'+ekey+'/SURVEY/'+skey+'/ANSWER/'+answerkey+'/'+member.getID()] = member.getEmail();
        firebase.database().ref().update(update);
    }

    unvote(ekey:string,skey:string,answerkey:string, member:Member,set:boolean): void{
        let update={};
        if(set){
             update['/EVENT/'+ekey+'/SURVEY/'+skey+'/ANSWER/'+answerkey] = true;
        }else{
            update['/EVENT/'+ekey+'/SURVEY/'+skey+'/ANSWER/'+answerkey+'/'+member.getID()] = null;
        }
        firebase.database().ref().update(update);
    }

}