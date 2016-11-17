import { Component, OnInit, Input } from '@angular/core';
import { FirebaseService } from '../../firebase.service';
import { Router } from '@angular/router';
import { UserService} from '../../user.service';
import { EventService} from '../event.service';
import { Event } from '../event';
import { EventDataService } from '../event-data.service';

@Component({
    moduleId: module.id,
    selector: 'container-view',
    templateUrl: 'container-view.component.html',
    styleUrls: [ 'container-view.component.css' ]
})

export class ContainerViewComponent{

    eventlist:Event[];

    showEvents: boolean = false;

    constructor(
        private firebase: FirebaseService,
        private router: Router,
        private user: UserService,
        private event: EventService,
        private eventdata: EventDataService,
    ) {}

    ngOnInit(){
        this.eventlist =[];
        this.eventdata.getEventListSubject().asObservable().subscribe(list => this.upddateList(list));
        
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    upddateList(list:Event[]):void{
        console.log("subscribe");
        console.log(list);
        this.eventlist = list;
        this.showEvents = true;
    }

    
}