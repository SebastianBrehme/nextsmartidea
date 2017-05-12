import { Injectable } from '@angular/core';
import { FirebaseService } from '../../firebase/firebase.service';
import { Task } from './task';
import { SubTask } from './subTask';

@Injectable()
export class TaskService {

    constructor(
        private firebase: FirebaseService) { }

    createTask(task: Task, ekey: string) {
        this.firebase.createTask(task,ekey);
    }

    deleteSubTask(ekey:string, tkey:string,subtaskkey:string){
        this.firebase.deleteSubTask(ekey, tkey, subtaskkey);
    }

    checkDone(ekey:string, tkey:string, stkey:string, done:boolean){
       this.firebase.checkDone(ekey, tkey, stkey,done);
    }

    setWho(ekey:string, tkey:string, stkey:string, who:string){
       this.firebase.setWho(ekey, tkey, stkey, who);
    }

    addSubTask(ekey: string, tkey:string, subtask: SubTask){
        this.firebase.addSubTask(ekey, tkey, subtask);
    }

    convert(data: any): Task[] {
        let allTasks: Task[] = [];

        for (let m in data) {

            let task: Task = new Task(data[m]['TITEL']);
            task.setKey(m);

            for (let n in data[m]['SUBTASK']) {
                let subTask: SubTask = new SubTask(data[m]['SUBTASK'][n]['TITEL']);
                subTask.setKey(n);
                subTask.setDone(data[m]['SUBTASK'][n]['DONE']);
                subTask.setWho(data[m]['SUBTASK'][n]['WHO']);
                task.addSubTask(subTask);
            }
            allTasks.push(task);
        }

        return allTasks;
    }
}