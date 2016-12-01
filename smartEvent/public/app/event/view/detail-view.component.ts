import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EventService} from '../event.service';
import { Event } from '../event';
import { Location } from '@angular/common'
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId: module.id,
    selector: 'detail-view',
    templateUrl: 'detail-view.component.html'
})

export class DetailViewComponent implements OnInit{

    showEvent: boolean = false;
    event:Event;
    key:string;

    constructor(
        private router: Router,
        private activatetRoute: ActivatedRoute,
        private eventService: EventService,
        private location: Location
    ) {}

    ngOnInit(): void {
    console.log("OnInit detail-view");
    this.activatetRoute.params.switchMap((params: Params) => this.key = params['id']).subscribe();
    console.log("mein EventKey: " +  this.key);
    this.eventService.getEvent(this.key, (e:Event) => this.event = e); 

    if(this.event){
        console.log(this.event);
        console.log("Mein Event: " + this.event.getTitle());
    }
    
    

  }

  goBack(): void {
    this.location.back();
  }

  eventCallback= (event:Event) =>{
      console.log("eventCallback: event=" + event);
      console.log(event);
  }

}