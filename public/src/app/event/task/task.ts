import { SubTask } from './subTask';

export class Task {

    key: string;
    title: string;
    subTasks: SubTask[];

    constructor(title: string){
        this.title = title;
        this.subTasks = [];
    }

    getKey():string{
        return this.key;
    }

    setKey(key:string){
        this.key = key;
    }

    getTitle(): string{
        return this.title;
    }

    setSubTasks(sTasks: SubTask[]){
        this.subTasks = sTasks;
    }

    getSubTasks():SubTask[]{
        return this.subTasks;
    }

    addSubTask(sTask: SubTask){
        this.subTasks.push(sTask);
    }

    removeSubTask(index: number){
        this.subTasks.splice(index, 1);
    }

    getUserSubTasks(user:string):SubTask[]{
        let tasks:SubTask[] = [];
        this.getSubTasks().forEach(sub =>{
            sub.getUserSubTask(user,tasks);
        });
        return tasks;
    }
}