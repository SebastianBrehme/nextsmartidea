import {Injectable} from '@angular/core';
import {Task} from '../event/task/task';
import {SubTask} from '../event/task/subTask';

declare var firebase:any;

@Injectable()
export class FirebaseTaskService{

    createTask(task:Task, ekey:string): void{
        let newTaskKey = firebase.database().ref('/EVENT/'+ekey+'/TASK/').push().key;
        
        let taskData = {
            TITEL: task.getTitle()
        }

        let update={}; 
        update['/EVENT/'+ekey+'/TASK/'+newTaskKey] = taskData;
        firebase.database().ref().update(update).then(()=>{
            let updateAnswer = {};
            for(let sTasks of task.getSubTasks()){
                firebase.database().ref('/EVENT/'+ekey+'/TASK/'+newTaskKey+'/SUBTASK/').push({
                    TITEL: sTasks.getTitle(),
                    WHO: sTasks.getWho(),
                    DONE: sTasks.getDone()
                });                
            }
        }); 
    }

    deleteSubTask(ekey:string, tkey:string,subtaskkey:string): void{
        let update = {};
        update['/EVENT/'+ekey+'/TASK/'+tkey+'/SUBTASK/'+subtaskkey] = null;
        firebase.database().ref().update(update);
    }

    checkDone(ekey:string, tkey:string, stkey:string, done:boolean): void{
        let update = {};
        update['/EVENT/'+ekey+'/TASK/'+tkey+'/SUBTASK/'+stkey+'/DONE'] = done;
        firebase.database().ref().update(update);
    }

    setWho(ekey:string, tkey:string, stkey:string, who:string): void{
        let update = {};
        update['/EVENT/'+ekey+'/TASK/'+tkey+'/SUBTASK/'+stkey+'/WHO'] = who;
        firebase.database().ref().update(update);
    }

    addSubTask(ekey: string, tkey:string, subtask:SubTask): void{
        let newTaskKey = firebase.database().ref('/EVENT/'+ekey+'/TASK/'+tkey+'/SUBTASK/').push().key;
        let staskdata = {
            TITEL: subtask.getTitle(),
            WHO: subtask.getWho(),
            DONE: subtask.getDone()
        }
        let update = {};
        update['/EVENT/'+ekey+'/TASK/'+tkey+'/SUBTASK/'+newTaskKey]=staskdata;
        firebase.database().ref().update(update);
    }
}