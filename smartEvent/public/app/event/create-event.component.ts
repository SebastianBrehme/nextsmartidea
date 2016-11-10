import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'create-event',
    templateUrl: 'create-event.component.html'
})


export class CreateEventComponent implements OnInit {

    invitesList: Array<inviteWithValidation> = [];
    currentInviteString: string = "";

    inputName: string = "";

    inputDateDayFrom: string = "";
    inputDateMonthFrom: string = "";
    inputDateYearFrom: string = "";

    inputDateDayTo: string = "";
    inputDateMonthTo: string = "";
    inputDateYearTo: string = "";

    showWarningDateFrom: boolean = false;
    showWarningDateTo: boolean = false;

    showWarningName: boolean = false;
    showWarningLastInvite: boolean = false;
    showWarningCheckboxAgreed: boolean = false;

    checkboxAgreeSelected: boolean = false;

    constructor(
        private firebase: FirebaseService,
        private router: Router,
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
        } else if (this.currentInviteString.length < 1) {
            //do nothing
        } else {
            this.showWarningLastInvite = true;
        }

    }

    onDeleteInviteClicked(index: number) {
        this.invitesList.splice(index, 1);
        this.checkInvites();
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

        if (checkAll) {
            alert("submit succeeded");
        }
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

    checkDate(): boolean {
        let dateFromChecked: boolean = false;
        let dateToChecked: boolean = false;

        if (this.inputDateDayFrom.length > 0 || this.inputDateMonthFrom.length > 0 || this.inputDateYearFrom.length > 0) {
            if (this.checkDateValidity(this.inputDateYearFrom, this.inputDateMonthFrom, this.inputDateDayFrom)) {
                dateFromChecked = true;
            }

            if (dateFromChecked) {
                this.showWarningDateFrom = false;
            } else {
                this.showWarningDateFrom = true;
            }
        }else{
            //date is optional
            dateFromChecked = true;
        }



        if (this.inputDateDayTo.length > 0 || this.inputDateMonthTo.length > 0 || this.inputDateYearTo.length > 0) {
            if (this.checkDateValidity(this.inputDateYearTo, this.inputDateMonthTo, this.inputDateDayTo)) {
                dateToChecked = true;
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
                console.log("checked " + invite.email);
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