import { Component, OnInit, OnChanges, ApplicationRef } from '@angular/core';
import { Router, ActivatedRoute, Params, Event as NavigationEvent } from '@angular/router';
import { EventService} from '../event.service';
import { Event } from '../event';
import { Location } from '@angular/common';
import { Task } from './task';
import { SubTask } from './subTask';
import { TaskService} from './task.service';


@Component({
    moduleId: module.id,
    selector: 'create-task',
    templateUrl: 'create-task.component.html',
    styleUrls: [ 'create-task.component.css' ]
})

export class CreateTaskComponent implements OnInit {
    title: string = "";
    task: Task;
    subTaskList: Array<SubTask> = [];
    currentWhat: string = "";
    currentWho: string = "";
    allMail: string = "";
    showWarningTitle: boolean = false;
    showWarningWhat: boolean = false;
    showWarningWho: boolean = false;
    showWarningEmail: boolean = false;
    eventKey: string;

    constructor(
        private activatetRoute: ActivatedRoute,
        private location: Location,
        private taskservice: TaskService,
        private ref: ApplicationRef
    ) {}

    ngOnInit()
    {
        this.activatetRoute.params.switchMap((params: Params) => this.eventKey = params['id']).subscribe();
    }

    goBack(): void 
    {
        this.location.back();
    }

    onAddTaskClicked()
    {
        if(this.checkCurrentWhat() && this.checkCurrentWho())
        {
            let newSubTask = new SubTask(this.currentWhat);
            if(this.currentWho.length > 0)
            {
                newSubTask.setWho(this.currentWho);
            }
            this.subTaskList.push(newSubTask);
            (<HTMLInputElement>document.getElementById("currentWhat")).value = "";
            (<HTMLInputElement>document.getElementById("currentWho")).value = "";
            this.ref.tick();
        }
    }

    onDeleteTaskClicked(index: number) 
    {
        this.subTaskList.splice(index, 1);
        this.ref.tick();
    }

    onSubmitClicked()
    {
        if(this.checkTitle())
        {
            if(this.allMail.length > 0)
            {
                if(this.checkCurrentAllMail())
                {
                    for(let a of this.subTaskList)
                    {
                        a.setWho(this.allMail);
                    }
                }
            }

            this.task = new Task(this.title);
            this.task.setSubTasks(this.subTaskList);

            this.taskservice.createTask(this.task,this.eventKey);

            this.goBack();
        }
    }

    /*checks*/
    checkTitle(): boolean 
    {
        this.showWarningTitle = false;
        if(this.title.length > 0) 
        {
            return true;
        }
        this.showWarningTitle = true;
        return false;
    }

    checkCurrentWhat(): boolean 
    {
        this.showWarningWhat = false;
        if(this.currentWhat.length > 0)
        {
            return true;
        }
        this.showWarningWhat = true;
        return false;
    }

    checkCurrentWho(): boolean 
    {
        this.showWarningWho = false;
        if(this.currentWho.length > 0)
        {
            if(this.checkMailValidity(this.currentWho))
            {
                return true;
            }
            this.showWarningWho = true;
            return false;
        }
        return true;
    }

    checkCurrentAllMail(): boolean
    {
        this.showWarningEmail = false;
        if(this.allMail.length > 0)
        {
            if(this.checkMailValidity(this.allMail))
            {
                return true;
            }
            this.showWarningEmail = true;
            return false;
        }
        return true;
    }

    checkMailValidity(email: string): boolean 
    {
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}