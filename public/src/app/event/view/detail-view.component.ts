import { Component, OnInit, OnChanges, ApplicationRef } from '@angular/core';
import { Router, ActivatedRoute, Params, Event as NavigationEvent } from '@angular/router';
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

    eventTitle:string;
    eventDescription:string;

    constructor(
        private router: Router,
        private activatetRoute: ActivatedRoute,
        private eventService: EventService,
        private location: Location,
        private ref: ApplicationRef,
    ) {
        router.events.forEach((event: NavigationEvent) => {this.updateEvent()});
    }

    ngOnInit(): void {
    this.activatetRoute.params.switchMap((params: Params) => this.key = params['id']).subscribe();
    }

    updateEvent(){
        this.eventService.getEvent(this.key, (e:Event) => {
            this.event = e;
            this.ref.tick();
            
        });
    }

  goBack(): void {
    this.location.back();
  }

}