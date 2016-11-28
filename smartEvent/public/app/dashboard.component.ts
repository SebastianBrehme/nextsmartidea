import { Component, OnInit, Input } from '@angular/core';
//import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';
//import { UserService} from './user.service';
//import { EventService} from './event/event.service';
//import { Event } from './event/event';
import { ContainerViewComponent } from './event/view/container-view.component';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent{

    eventlist:Event[];

    constructor(
        //private firebase: FirebaseService,
        private router: Router,
 //       private user: UserService,
 //       private event: EventService,
    ) { 
        this.eventlist =[];
        //function(list){
            //console.log("subscribe");
            //this.eventlist = list;
        //});
        
    }
/*
    upddateList(list:Event[]):void{
        console.log("subscribe");
        console.log(list);
        this.eventlist = list;
    }
    */
/*
    doLogout(): void {
        let result = this.firebase.signOut();
        if(result == true){
        }else{
            //Todo Fehler anzeigen
        }
    }
*/
    doEvent(): void{
        console.log('dashboard: doEvent');
   //     this.user.setLogedIn(!this.user.isLogedIn());
        //this.eventlist = this.eventdata.getEventList();
        //let e:Event  = new Event();
        //e.titel= "mein krampf";
        //this.eventlist.push(e);
        //this.event.getEventList();
        //this.event.getEventList();
        //this.event.getEvent('-KVWYlPhWQrQyHBI-HZh').then(event => console.log(event));
    }
}