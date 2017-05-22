import { Component, OnInit, OnChanges, ApplicationRef, Input, Output } from '@angular/core';
import { EventService } from '../event.service';
import { SurveyService } from './survey.service';
import { Member } from '../member';
import { Survey } from './survey';
import { Event } from '../event';
import { UserService } from '../../user.service';


@Component({
    moduleId: module.id,
    selector: 'survey',
    templateUrl: 'survey.component.html',
    styleUrls: ['survey.component.css']
})

export class SurveyComponent implements OnInit, OnChanges {

    event: Event;
    @Input() eventKey: string;
    surveyList: Survey[];
    noSurvey: boolean = true;

    first: boolean = true;

    showWarningVote: boolean = false;
    showWarningSelection: boolean = false;

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    
    public barChartLabels: string[][] = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = true;

    public barChartData: any[][] = [];
       

    constructor(
        private eventService: EventService,
        private surveyService: SurveyService,
        private userService: UserService
    ) {
        this.barChartLabels[0] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
        this.barChartData[0] = [ 
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
        ];
    }

    ngOnInit(): void {
        this.updateEvent();
    }

    ngOnChanges(changes: any) {
        this.updateEvent();
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    updateEvent() {
        this.eventService.getEvent(this.eventKey, (e: Event) => {
            this.event = e;
            this.surveyList = this.event.getSurvey();
            if(this.surveyList.length>0) { this.noSurvey = false; }
            else { this.noSurvey = true; }
            this.first = true;
            this.setBarChart();
        });
    }
    
    setBarChart(){
        this.surveyList.forEach((surv,index) =>{
            this.barChartLabels[index] = [];
            let votecount:number[] = [];
            surv.getAnswers().forEach(ans =>{
                this.barChartLabels[index].push(ans.getAnswer());
                votecount.push(ans.getVotesCount());
            });
            this.barChartData[index] = [{
                data: votecount, label: 'Votes'
            }];
        });            
    }

    setState() {
        let me: Member = this.getMember();
        this.surveyList.forEach((item, i) => {
            let selectType: string = "";
            if (item.getMultiple()) { selectType = "mul"; }
            else { selectType = "ea"; }
            item.getAnswers().forEach((answ, ind) => {
                if (answ.hasVoted(me)) {
                    (<HTMLInputElement>document.getElementById(selectType + "#" + i + "#" + ind)).setAttribute("checked", "checked");
                }
            });
        });
    }

    uncheckRadios(index: number, ansindex: number) {
        let length: number = this.surveyList[index].getAnswers().length;
        for (let x: number = 0; x < length; x = x + 1) {
            if (x !== ansindex) {
                (<HTMLInputElement>document.getElementById("ea#" + index + "#" + x)).checked = false;
            }
        }
    }

    removeVotes(survey: Survey, index: number) {
        let member: Member = this.getMember();
        let skey: string = survey.getKey();
        for (let a of survey.getAnswers()) {
            if (a.hasVoted(member)) {
                this.surveyService.unvote(this.eventKey, skey, a, member);
            }
        }
        this.titleClicked(index);
    }

    voteClicked(survey: Survey, index: any) {
        let member: Member = this.getMember();
        if (survey.multiple || !this.hasVoted(survey, member)) {
            this.showWarningVote = false;
            this.warningVote(false, index);
            this.showWarningSelection = false;
            this.warningSelection(false, index);
            let answerCount: number = survey.getAnswers().length;

            let selectType: string = "";
            if (survey.getMultiple()) { selectType = "mul"; }
            else { selectType = "ea"; }

            let selectedSomething: boolean = false;
            survey.getAnswers().forEach((item, i) => {
                if ((<HTMLInputElement>document.getElementById(selectType + "#" + index + "#" + i)).checked) {
                    selectedSomething = true;
                    this.surveyService.vote(this.eventKey, survey.key, item, member);
                }
                else {
                    // this.surveyService.unvote(this.eventKey, survey.getKey(), item, member);
                }
            });

            if (!selectedSomething) {
                this.showWarningSelection = true;
                this.warningSelection(true, index);
            }
        }
        else {
            this.showWarningVote = true;
            this.warningVote(true, index);
            this.titleClicked(index);
        }
        this.titleClicked(index);
    }

    hasVoted(survey: Survey, member: Member): boolean {
        for (let a of survey.getAnswers()) {
            if (a.hasVoted(member)) {
                return true;
            }
        }
        return false;
    }

    getMember(): Member {
        let me: string = this.userService.getUser().email;
        for (let m of this.event.getMember()) {
            if (m.email == me) {
                return m;
            }
        }
        return null;
    }

    /*style function*/

    warningSelection(show: boolean, index: any) {
        if (show) {
            document.getElementById("warningSelection#" + index).classList.toggle("show");
        }
        else {
            document.getElementById("warningSelection#" + index).classList.toggle("hide");
        }
    }

    warningVote(show: boolean, index: any) {
        if (show) {
            document.getElementById("warningVote#" + index).classList.toggle("show");
        }
        else {
            document.getElementById("warningVote#" + index).classList.toggle("hide");
        }
    }

    titleClicked(index: any) {
        if (this.first) { this.setState(); this.first = false; }
        document.getElementById("surveyContent#" + index).classList.toggle("show");
    }
}