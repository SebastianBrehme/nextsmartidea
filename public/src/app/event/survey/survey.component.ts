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
    templateUrl: 'survey.component.html'
})

export class SurveyComponent implements OnInit {

    event:Event;
    @Input() eventKey: string;
    surveyList:Survey[]; 

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
        let answerCount: number = survey.getAnswers().length;

        let selectType: string = "";
        if(survey.getMultiple()){ selectType="mul"; }
        else { selectType="ea"; }

        survey.getAnswers().forEach((item, i) => {
            if((<HTMLInputElement>document.getElementById(selectType + "#" + index + "#" + i)).checked){
                this.surveyService.vote(this.eventKey, survey.key, item, this.getMember());
            }
        });
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

    
}