import {Injectable} from '@angular/core';
import {Task} from '../event/task/task';
import {SubTask} from '../event/task/subTask';

declare var firebase:any;

@Injectable()
export class FirebaseSurveyService{

    createTask(task:Task, ekey:string){
        let newTaskKey = firebase.database().ref('/EVENT/'+ekey+'/TASK/').push().key;
        
        let taskData = {
            TITEL: task.getTitle()
        }

        let update={}; 
        update['/EVENT/'+ekey+'/SURVEY/'+newTaskKey] = taskData;
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

    deleteSubTask(subtask:SubTask){

    }

    checkDone(){

    }
}