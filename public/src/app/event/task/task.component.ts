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

export class TaskComponent implements OnInit, OnChanges 
{

    @Input() eventKey: string;
    event: Event;
    taskList: Task[];


    constructor(
        private eventService: EventService,
        private taskService: TaskService,
        private userService: UserService
    )
    {}

    ngOnInit(): void 
    {}

    ngOnChanges(changes: any) 
    {
        this.updateEvent();
    }

    updateEvent()
    {
        this.eventService.getEvent(this.eventKey, (e:Event) => 
        {
            this.event = e;
            this.taskList = this.event.getTask();
        });
    }

    checkBoxChanged(i: number, subi: number, state: boolean)
    {
        this.taskService.checkDone(this.eventKey, this.taskList[i].getKey(), this.taskList[i].getSubTasks()[subi].getKey(), state);
        this.keepContentOpen(i);
    }

    onAddSubTaskClicked(index: number)
    {
        this.warningWhat(false, index);
        this.warningWho(false, index);
        let title: string = "";
        let who: string = "";
        title = (<HTMLInputElement>document.getElementById("subtaskWhat#" + index)).value;
        who = (<HTMLInputElement>document.getElementById("subtaskWho#" + index)).value;

        if(this.checkTitle(title))
        {
            this.warningWhat(false, index);
            let subt: SubTask = new SubTask(title);
            if(who.length > 0)
            {
                if(this.checkWho(who))
                {
                    this.warningWho(false, index);
                    subt.setWho(who);
                    this.taskService.addSubTask(this.eventKey, this.taskList[index].getKey(), subt);
                }
                else
                {
                    this.warningWho(true, index);
                }
            }
            else
            { 
                subt.setWho("--"); 
                this.taskService.addSubTask(this.eventKey, this.taskList[index].getKey(), subt);
            }  
        }
        else
        {
            this.warningWhat(true, index);
        } 
        this.keepContentOpen(index); 
    }

    onAddWhoClicked(i: number, subindex: number)
    {
        this.warningSubtaskWho(false, i, subindex);
        let who: string = (<HTMLInputElement>document.getElementById("subTaskWho#" + i + "#" + subindex)).value;
        if(who !== "--")
        {
            if(who.length>0)
            {
                if(this.checkWho(who))
                {
                    this.taskService.setWho(this.eventKey, this.taskList[i].getKey(), this.taskList[i].getSubTasks()[subindex].getKey(), who);
                }
                else
                {
                    this.warningSubtaskWho(true, i, subindex);
                }
            }
            else
            {
                this.taskService.setWho(this.eventKey, this.taskList[i].getKey(), this.taskList[i].getSubTasks()[subindex].getKey(), "--");
            }
        }
        this.keepContentOpen(i);
    }

    onDeleteTaskClicked(i: number, subindex: number)
    {
        this.taskService.deleteSubTask(this.eventKey, this.taskList[i].getKey(), this.taskList[i].getSubTasks()[subindex].getKey());
        this.keepContentOpen(i);
    }

    checkTitle(title: string): boolean 
    {
        if(title.length>0)
        {
            return true;
        }
        return false;
    }

    checkWho(who: string): boolean 
    {
        if(who.length > 0)
        {
            if(this.checkMailValidity(who))
            {
                return true;
            }
            return false;
        }
        return true;
    }

    checkMailValidity(email: string): boolean 
    {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    warningWhat(show: boolean, index: any)
    {
        if(show)
        {
            document.getElementById("warningWhat#" + index).classList.toggle("show");
            document.getElementById("warningWhat#" + index).classList.remove("hide");
        }
        else
        {
            document.getElementById("warningWhat#" + index).classList.toggle("hide");
            document.getElementById("warningWhat#" + index).classList.remove("show");
        }
    }

    warningWho(show: boolean, index: any)
    {
        if(show){
            document.getElementById("warningWho#" + index).classList.toggle("show");
            document.getElementById("warningWho#" + index).classList.remove("hide");
        }
        else{
            document.getElementById("warningWho#" + index).classList.toggle("hide");
            document.getElementById("warningWho#" + index).classList.remove("show");
        }
    }

    warningSubtaskWho(show: boolean, i: number, sindex: number)
    {
        if(show)
        {
            document.getElementById("warningWho#" + i + "#" + sindex).classList.toggle("show");
            document.getElementById("warningWho#" + i + "#" + sindex).classList.remove("hide");
        }
        else
        {
            document.getElementById("warningWho#" + i + "#" + sindex).classList.toggle("hide");
            document.getElementById("warningWho#" + i + "#" + sindex).classList.remove("show");
        }
    }

    titleClicked(index: number) 
    {
        document.getElementById("taskContent#" + index).classList.toggle("show");   
    }

    keepContentOpen(index: number)
    {
        if(!document.getElementById("taskContent#" + index).classList.contains("show"))
        {
            this.titleClicked(index);
        } 
    }
}