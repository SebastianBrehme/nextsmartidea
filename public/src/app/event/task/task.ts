import { SubTask } from './subTask';

export class Task {

    title: string;
    subTasks: SubTask[];

    constructor(title: string){
        this.title = title;
    }

    getTitle(): string{
        return this.title;
    }

    setSubTasks(sTasks: SubTask[]){
        this.subTasks = sTasks;
    }

    addSubTask(sTask: SubTask){
        this.subTasks.push(sTask);
    }

    removeSubTask(index: number){
        this.subTasks.splice(index, 1);
    }
}