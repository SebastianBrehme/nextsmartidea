import { Component, OnInit, OnChanges, ApplicationRef, Input, Output } from '@angular/core';
import { EventService} from '../event.service';
import { Member } from '../member';
import { Event } from '../event';
import { UserService } from '../../user.service';
import { TaskService } from './task.service';
import { Task } from './task';

@Component({
    moduleId: module.id,
    selector: 'task',
    templateUrl: 'task.component.html',
    styleUrls: [ 'task.component.css' ]
})

export class TaskComponent implements OnInit, OnChanges {

    @Input() eventKey: string;
    event: Event;
    taskList: Task[];


    constructor(
        private eventService: EventService,
        private taskService: TaskService,
        private userService: UserService
    ){}

    ngOnInit(): void {
        //this.updateEvent();
    }

    ngOnChanges(changes: any) {
        this.updateEvent();
    }

    updateEvent(){
        this.eventService.getEvent(this.eventKey, (e:Event) => {
            this.event = e;
            this.taskList = this.event.getTask();
        });
    }
}