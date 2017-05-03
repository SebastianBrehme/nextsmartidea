import { Component, OnInit, OnChanges, ApplicationRef } from '@angular/core';
import { Router, ActivatedRoute, Params, Event as NavigationEvent } from '@angular/router';
import { EventService} from '../event.service';
import { Event } from '../event';
import { Location } from '@angular/common'
import { Survey } from './survey';
import { Answer } from './answer';
import { SurveyService} from './survey.service';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'create-survey',
    templateUrl: 'create-survey.component.html'
})

export class CreateSurveyComponent implements OnInit{

    title: string="";
    easySelected: boolean=false;
    MultipleSelected: boolean = false;
    question: string ="";
    answerlist: Array<Answer> = [];
    currentAnswerString: string ="";

    showWarningTitle: boolean = false;
    showWarningSelection: boolean = false;
    showWarningLessAnswer: boolean = false;
    showWarningLastAnswer: boolean=false;
    showWarningLastAnswerAvoid: boolean = false;
    showWarningQuestion: boolean=false;


    newSurvey: Survey;
    eventKey: string;

    constructor(
        private router: Router,
        private activatetRoute: ActivatedRoute,
        private eventService: EventService,
        private location: Location,
        private ref: ApplicationRef,
        private surveyservice: SurveyService
    ) {
       
    }

    ngOnInit(){
        this.activatetRoute.params.switchMap((params: Params) => this.eventKey = params['id']).subscribe();
    }

    onAddAnswerClicked() {
        //".", "#", "$", "/", "[", or "]"
        if(this.currentAnswerString.indexOf(".")>=0 ||
            this.currentAnswerString.indexOf("#")>=0 ||
            this.currentAnswerString.indexOf("$")>=0 ||
            this.currentAnswerString.indexOf("/")>=0 ||
            this.currentAnswerString.indexOf("[")>=0 ||
            this.currentAnswerString.indexOf("]")>=0 ){
            this.showWarningLastAnswerAvoid=true;
            this.ref.tick();
        }
        else{
            this.showWarningLastAnswerAvoid=false;
            if(this.currentAnswerString.length < 1){
                this.showWarningLastAnswer = true;
                this.ref.tick();
            }
            else{
                this.showWarningLastAnswer = false;
                this.answerlist.push(new Answer(this.currentAnswerString));
                (<HTMLInputElement>document.getElementById("currentAnswerString")).value = "";
                this.ref.tick();
            }
        } 
    }

    onDeleteAnswerClicked(index: number) {
        this.answerlist.splice(index, 1);
        this.ref.tick();
    }

    onSubmitClicked() {
        let checkTitle: boolean = this.checkTitle();
        let checkSelect: boolean = this.checkSelect();
        let checkQuestion: boolean = this.checkQuestion();
        let checkAnswer: boolean = this.checkAnswer();

        let checkall: boolean = checkQuestion && checkTitle && checkSelect && checkAnswer;

        this.ref.tick();

        if(checkall){
            this.setSurvey();
        }
    }

    setSurvey(){
        this.newSurvey = new Survey(this.title);

        if(this.easySelected){
            this.newSurvey.setMultiple(false);
        }
        else{
            this.newSurvey.setMultiple(true);
        }
        this.newSurvey.setQuestion(this.question);
        this.newSurvey.setAnswers(this.answerlist);

        //send survey
        //alert(this.newSurvey.multiple + " " + this.newSurvey.question + " " + this.newSurvey.title + " " + this.newSurvey.answers.length);
        //this.newSurvey.answers.forEach(element => {
        //    alert(element);
        //});
        this.surveyservice.createSurvey(this.newSurvey,this.eventKey);
        //this.router.navigate([' ']);
    }

    goBack(): void {
        this.location.back();
    }

    checkTitle(): boolean {
        this.showWarningTitle = false;
        if(this.title.length > 0){
            return true;
        }
        else{
            this.showWarningTitle = true;
            return false;
        }
    }

    checkSelect(): boolean {
        this.showWarningSelection = false;
        if(this.easySelected || this.MultipleSelected){
            return true;
        }
        else{
            this.showWarningSelection = true;
            return false;
        }
    }

    checkQuestion(): boolean {
        this.showWarningQuestion = false;
        if(this.question.length>0){
            return true;
        }
        else{
            this.showWarningQuestion=true;
            return false;
        }
    }

    checkAnswer(): boolean {
        this.showWarningLessAnswer = false;
        if(this.answerlist.length<2){
            this.showWarningLessAnswer = true;
            return false;
        }
        else{
            return true;
        }
    }
}