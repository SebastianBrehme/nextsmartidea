import { Component, OnInit, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from './event';
import { Member } from './member';
import {EventService } from './event.service';

@Component({
    moduleId: module.id,
    selector: 'create-event',
    templateUrl: 'create-event.component.html'
})


export class CreateEventComponent implements OnInit {

    invitesList: Array<inviteWithValidation> = [];
    currentInviteString: string = "";

    dateFrom: Date;
    dateTo: Date;

    selectedType: string = "Party";

    inputName: string = "";
    inputDescription: string;

    inputDateFrom: string;
    inputDateTo: string;

    inputTimeFrom: string;
    inputTimeTo: string;

    showWarningDateFrom: boolean = false;
    showWarningDateTo: boolean = false;

    showWarningName: boolean = false;
    showWarningLastInvite: boolean = false;
    showWarningCheckboxAgreed: boolean = false;

    checkboxAgreeSelected: boolean = false;

    newEvent: Event;

    constructor(
        private router: Router,
        private eventservice: EventService,
        private ref: ApplicationRef,
    ) { }

    ngOnInit() {
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    onAddInviteClicked() {
        if (this.checkMailValidity(this.currentInviteString)) {
            this.invitesList.push({ email: this.currentInviteString, validated: true });
            this.currentInviteString = "";
            this.showWarningLastInvite = false;
            this.ref.tick();
        } else if (this.currentInviteString.length < 1) {
            //do nothing
        } else {
            this.showWarningLastInvite = true;
            this.ref.tick();
        }

    }

    onDeleteInviteClicked(index: number) {
        this.invitesList.splice(index, 1);
        this.checkInvites();
        this.ref.tick();
    }

    onSubmitClicked() {

        //add the last invite to invitesList
        this.onAddInviteClicked();

        let checkSubmitName: boolean = this.checkName();
        let checkSubmitDescription: boolean = this.checkDescription();
        let checkSubmitDate: boolean = this.checkDate();
        let checkSubmitImage: boolean = this.checkImage();
        let checkSubmitInvites: boolean = this.checkInvites();
        let checkSubmitAgree: boolean = this.checkAgree();

        let checkAll: boolean = checkSubmitName && checkSubmitDescription && checkSubmitDate && checkSubmitImage && checkSubmitInvites && checkSubmitAgree;

        this.ref.tick();
        
        if (checkAll) {
            this.setEvent();

        }
    }

    setEvent(){
        this.newEvent = new Event(this.inputName);
        this.newEvent.setType(this.selectedType);
        
        if(this.inputDescription){
            this.newEvent.setDescription(this.inputDescription);
        }
        if(this.dateFrom){
            this.newEvent.setDateFrom(this.dateFrom);
        }
        if(this.dateTo){
            this.newEvent.setDateTo(this.dateTo);
        }
        if(this.invitesList.length > 0){
            let memberList:Member[] = [];
            for(let invite of this.invitesList){
                memberList.push(new Member(invite.email,''));
            }
            this.newEvent.setMember(memberList);
        }

        //console.log("Created Event: " + this.newEvent.getTitle());
        //console.log(this.newEvent);
        this.sendEvent();
        this.router.navigate(['']);
        
    }

    sendEvent():void{
        this.eventservice.createEvent(this.newEvent);
    }


    /*
     checks
    */
    checkName(): boolean {
        this.showWarningName = false;

        if (this.inputName.length > 0) {
            return true;
        } else {
            this.showWarningName = true;
            return false;
        }

    }

    checkDescription(): boolean {
        return true;
    }

    checkType(): boolean {
        return true;
    }

    transformDate(date: string, time?:string): Date {
        let dateLocal = new Date();
        dateLocal.setTime(0);

        dateLocal.setUTCFullYear(Number (date.charAt(0) + date.charAt(1) + date.charAt(2) + date.charAt(3)));
        dateLocal.setUTCMonth((Number (date.charAt(5) + date.charAt(6))) - 1);
        dateLocal.setUTCDate(Number (date.charAt(8) + date.charAt(9)));

        if(time){
            //dateLocal.setUTCHours((Number (time.charAt(0) + time.charAt(1))) - 1);
            dateLocal.setHours((Number (time.charAt(0) + time.charAt(1))));
            dateLocal.setMinutes(Number (time.charAt(3) + time.charAt(4)));
        }
        

        //console.log("Date: " + dateLocal);
        //console.log("Day: " + dateLocal.getUTCDate());
        //console.log("Month: " + (dateLocal.getUTCMonth() + 1));
        //console.log("Year: " + dateLocal.getUTCFullYear());
        //console.log("Time: " + (dateLocal.getUTCHours() + 1) + ":" + dateLocal.getUTCMinutes());

        return dateLocal;
    }

    checkDate(): boolean {
        let dateFromChecked: boolean = false;
        let dateToChecked: boolean = false;

        if (this.inputDateFrom) {

            if(this.inputTimeFrom){
                this.dateFrom = this.transformDate(this.inputDateFrom, this.inputTimeFrom)
            }else{
                this.dateFrom = this.transformDate(this.inputDateFrom)
            }
            
            

            dateFromChecked = true;

            if (dateFromChecked) {
                this.showWarningDateFrom = false;
            } else {
                this.showWarningDateFrom = true;
            }
        }else{
            //date is optional
            dateFromChecked = true;
        }



        if (this.inputDateTo) {
            
            if(this.inputTimeTo){
                this.dateTo = this.transformDate(this.inputDateTo, this.inputTimeTo)
            }else{
                this.dateTo = this.transformDate(this.inputDateTo)
            }

            if(this.dateFrom < this.dateTo){
                dateToChecked = true;
            }else{
                dateToChecked = false;
            }

            if (dateToChecked) {
                this.showWarningDateTo = false;
            } else {
                this.showWarningDateTo = true;
            }
        }else{
            //date is optional
            dateToChecked = true;
        }


        if (dateFromChecked && dateToChecked) {
            return true;
        } else {
            return false;
        }

    }

    checkImage(): boolean {
        return true;
    }

    checkInvites(): boolean {
        let check = true;
        for (let invite of this.invitesList) {
            if (this.checkMailValidity(invite.email)) {
                invite.validated = true;
                //console.log("checked " + invite.email);
            } else {
                invite.validated = false;
                check = false;
            }
        }
        return check;
    }

    checkAgree(): boolean {
        if (this.checkboxAgreeSelected) {
            this.showWarningCheckboxAgreed = false;
            return true;
        } else {
            this.showWarningCheckboxAgreed = true;
            return false;
        }

    }

    checkMailValidity(email: string): boolean {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    checkDateValidity(year: string, month: string, day: string): boolean {
        let dayInt = Number(day);
        let monthInt = Number(month);
        let yearInt = Number(year);

        if (isNaN(dayInt) || isNaN(monthInt) || isNaN(yearInt)) {
            return false;
        } else {

            try {
                let date = new Date(yearInt, monthInt - 1, dayInt);
                return true;
            } catch (Exception) {
                return false;
            }

        }

    }

}

interface inviteWithValidation {
    email: string;
    validated: boolean;
}