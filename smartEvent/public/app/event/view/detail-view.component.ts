import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService} from '../event.service';
import { Event } from '../event';

@Component({
    moduleId: module.id,
    selector: 'detail-view',
    templateUrl: 'detail-view.component.html'
})

export class DetailViewComponent{

    showEvent: boolean = false;

    constructor(
        private router: Router,
        private event: EventService,
    ) {}

    ngOnInit(){}

    ngAfterViewChecked(){}

}