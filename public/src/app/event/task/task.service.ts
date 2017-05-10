import { Injectable } from '@angular/core';
import { FirebaseService } from '../../firebase/firebase.service';
import { Task } from './task';
import { SubTask } from './subTask';

@Injectable()
export class TaskService {

    constructor(
        private firebase: FirebaseService) { }

    createTask(task: Task, ekey: string) {

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
                subTask.setWho([m]['SUBTASK'][n]['WHO']);
                task.addSubTask(subTask);
            }
        }

        return allTasks;
    }
}