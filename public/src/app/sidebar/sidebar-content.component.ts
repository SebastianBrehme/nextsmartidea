import { Component, OnInit, ApplicationRef, Output, EventEmitter } from '@angular/core';
import { EventService } from '../event/event.service';
import { Event } from '../event/event';

@Component({
    moduleId: module.id,
    selector: 'sidebar-content',
    templateUrl: 'sidebar-content.component.html',
})

export class SidebarContentComponent {

    eventList: Event[];

    showEvents: boolean = false;

    @Output() closeSidebar: EventEmitter<any> = new EventEmitter();

    constructor(
        private event: EventService,
        private ref: ApplicationRef,
    ) { }

    ngOnInit() {
        this.eventList = [];
        this.event.getEventList(this.updateList);
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    updateList = (list: Event[]) => {
        console.log('update: ' + list);
        this.eventList = list;
        this.showEvents = true;
        this.eventList.sort(this.compare);
        console.log(this.eventList);
        this.ref.tick()

    }

    compare(a, b) {
        a = a.date_from;
        b = b.date_from;
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        // a muss gleich b sein
        return 0;
    }

    handleEventClicked() {
        this.closeSidebar.emit();
        this.ref.tick();
    }


}