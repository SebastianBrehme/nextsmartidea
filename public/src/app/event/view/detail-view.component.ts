import { Component, OnInit, OnDestroy, OnChanges, ApplicationRef, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params, Event as NavigationEvent } from '@angular/router';
import { EventService} from '../event.service';
import { Event } from '../event';
import { Location } from '@angular/common';
import { ChatComponent } from '../chat/chat.component';
import { Subscription } from 'rxjs';
import { ChatService } from '../chat/chat.service';
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
    eventLocation:string;

    routerEventsSubscription: Subscription;

    constructor(
        private router: Router,
        private activatetRoute: ActivatedRoute,
        private eventService: EventService,
        private location: Location,
        private ref: ApplicationRef,
        private chatService: ChatService,
    ) {
        this.routerEventsSubscription = router.events.subscribe((event: NavigationEvent) => {this.updateEvent()});
    }

    ngOnInit(): void {
        this.activatetRoute.params.switchMap((params: Params) => this.key = params['id']).subscribe();
    }
    ngOnDestroy(): void{
        this.routerEventsSubscription.unsubscribe();
    }


    updateEvent(){
        this.eventService.getEvent(this.key, (e:Event) => {
            this.event = e;
            this.chatService.chatKeyChangedEvent.emit(this.event.getChatKey()); 
            this.ref.tick();
        });
    }

  goBack(): void {
    this.location.back();
  }

}