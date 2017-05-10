import {Injectable} from '@angular/core';
import {Task} from '../event/task/task';
import {SubTask} from '../event/task/subTask';

declare var firebase:any;

@Injectable()
export class FirebaseTaskService{

    createTask(task:Task, ekey:string){
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

    deleteSubTask(ekey:string, tkey:string,subtask:SubTask){
        let update = {};
        update['/EVENT/'+ekey+'/TASK/'+tkey+'/SUBTASK/'+subtask.getKey] = null;
        firebase.database().update(update);
    }

    checkDone(ekey:string, tkey:string, stkey:string, done:boolean){
        let update = {};
        update['/EVENT/'+ekey+'/TASK/'+tkey+'/SUBTASK/'+stkey+'/DONE'] = done;
        firebase.database().update(update);
    }

    setWho(ekey:string, tkey:string, stkey:string, who:string){
        let update = {};
        update['/EVENT/'+ekey+'/TASK/'+tkey+'/SUBTASK/'+stkey+'/WHO'] = who;
        firebase.database().update(update);
    }
}