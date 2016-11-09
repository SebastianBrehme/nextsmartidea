import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';
import { UserService} from './user.service';
import { EventService} from './event/event.service';
import { Event } from './event/event';
import { EventDataService } from './event/event-data.service';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent{

    eventlist:Event[];

    constructor(
        private firebase: FirebaseService,
        private router: Router,
        private user: UserService,
        private event: EventService,
        private eventdata: EventDataService,
    ) { 
        this.eventlist =[];
        this.eventdata.getEventListSubject().asObservable().subscribe(list => this.upddateList(list));
            //function(list){
            //console.log("subscribe");
            //this.eventlist = list;
        //});
        
    }

    upddateList(list:Event[]):void{
        console.log("subscribe");
        console.log(list);
        this.eventlist = list;
    }

    doLogout(): void {
        let result = this.firebase.signOut();
        if(result == true){
        }else{
            //Todo Fehler anzeigen
        }
    }

    doEvent(): void{
        console.log('dashboard: doEvent');
        //this.eventlist = this.eventdata.getEventList();
        //let e:Event  = new Event();
        //e.titel= "mein krampf";
        //this.eventlist.push(e);
        //this.event.getEventList();
        //this.event.getEventList();
        //this.event.getEvent('-KVWYlPhWQrQyHBI-HZh').then(event => console.log(event));
    }

    donext():void{
        console.log("mein test");
        //this.eventlist[0].titel="mein test";
    }
}