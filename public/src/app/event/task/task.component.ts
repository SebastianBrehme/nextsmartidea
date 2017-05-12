import { Component, OnInit, OnChanges, ApplicationRef, Input, Output } from '@angular/core';
import { EventService} from '../event.service';
import { Member } from '../member';
import { Event } from '../event';
import { UserService } from '../../user.service';
import { TaskService } from './task.service';
import { Task } from './task';
import { SubTask} from './subTask';

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

    checkBoxChanged(i: number, subi: number, state: boolean){
        this.taskService.checkDone(this.eventKey, this.taskList[i].getKey(), this.taskList[i].getSubTasks()[subi].getKey(), state);
    }

    onAddSubTaskClicked(index: number){
        let title: string = "";
        let who: string = "";
        title = (<HTMLInputElement>document.getElementById("subtaskWhat#" + index)).value;
        who = (<HTMLInputElement>document.getElementById("subtaskWho#" + index)).value;

        if(this.checkTitle(title)){
            let subt: SubTask = new SubTask(title);
            if(who.length > 0){
                if(this.checkWho(who)){
                    subt.setWho(who);
                }
                else{
                    //show error
                }
            }
            else{ subt.setWho("--"); }
            this.taskService.addSubTask(this.eventKey, this.taskList[index].getKey(), subt);
        }
        else{
            //show error
        }

        
    }

    onDeleteTaskClicked(i: number, subindex: number){
        this.taskService.deleteSubTask(this.eventKey, this.taskList[i].getKey(), this.taskList[i].getSubTasks()[subindex].getKey());
    }

    checkTitle(title: string) : boolean {
        if(title.length>0){
            return true;
        }
        return false;
    }

    checkWho(who: string): boolean {
        if(who.length > 0){
            if(this.checkMailValidity(who)){
                return true
            }
            return false;
        }
        return true;
    }

    checkMailValidity(email: string): boolean {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}