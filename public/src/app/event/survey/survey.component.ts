import { Component, OnInit, OnChanges, ApplicationRef, Input, Output } from '@angular/core';
//import { Router, ActivatedRoute, Params, Event as NavigationEvent } from '@angular/router';
import { EventService} from '../event.service';
import { SurveyService } from './survey.service';
import { Member } from '../member';
import { Survey } from './survey';
import { Event } from '../event';
import { UserService } from '../../user.service';


@Component({
    moduleId: module.id,
    selector: 'survey',
    templateUrl: 'survey.component.html',
    styleUrls: [ 'survey.component.css' ]
})

export class SurveyComponent implements OnInit {

    event:Event;
    @Input() eventKey: string;
    surveyList:Survey[]; 

    showWarningVote: boolean = false;
    showWarningSelection: boolean = false;

    constructor(
        private eventService: EventService,
        private surveyService: SurveyService,
        private userService: UserService
    ) {
        
         }

    ngOnInit(): void {
        this.updateEvent();
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    updateEvent(){
        this.eventService.getEvent(this.eventKey, (e:Event) => {
            this.event = e;
            this.surveyList = this.event.getSurvey();            
        });
    }

    voteClicked(survey: Survey, index: any){
        console.log(index);
        let member: Member = this.getMember();
        if(survey.multiple || !this.hasVoted(survey, member)){
            this.showWarningVote = false;
            this.warningVote(false, index);
            this.showWarningSelection = false;
            this.warningSelection(false, index);
            let answerCount: number = survey.getAnswers().length;

            let selectType: string = "";
            if(survey.getMultiple()){ selectType="mul"; }
            else { selectType="ea"; }

            let selectedSomething: boolean = false;
            survey.getAnswers().forEach((item, i) => {
                if((<HTMLInputElement>document.getElementById(selectType + "#" + index + "#" + i)).checked){
                    selectedSomething = true;
                    this.surveyService.vote(this.eventKey, survey.key, item, member);
                }
            });

            if(!selectedSomething){
                this.showWarningSelection = true;
                this.warningSelection(true, index);
            }
        }
        else{
            this.showWarningVote = true;
            this.warningVote(true, index);
        }
    }

    hasVoted(survey: Survey, member: Member):boolean {
        for(let a of survey.getAnswers()){
            if(a.hasVoted(member)){
                return true;
            }
        }
        return false;
    }

    getMember():Member{
        let me: string = this.userService.getUser().email;
        for(let m of this.event.getMember()){
            if(m.email==me){
                return m;
            }
        }
        return null;
    }

    /*style function*/

    warningSelection(show: boolean, index: any){
        if(show){
            document.getElementById("warningSelection#" + index).classList.toggle("show");
        }
        else{
            document.getElementById("warningSelection#" + index).classList.toggle("hide");
        }
    }

    warningVote(show: boolean, index: any){
        if(show){
            document.getElementById("warningVote#" + index).classList.toggle("show");
        }
        else{
            document.getElementById("warningVote#" + index).classList.toggle("hide");
        }
    }

    titleClicked(index: any){
        document.getElementById("surveyContent#" + index).classList.toggle("show");
    } 
}