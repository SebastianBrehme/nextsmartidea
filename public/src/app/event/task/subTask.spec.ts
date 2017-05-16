import {SubTask} from './subTask';

describe('SubTask', () =>{
    it('#title', () =>{
        let subTask: SubTask = new SubTask("title");
        expect(subTask.getTitle()).toBe("title");
        let t: string = "newTitle";
        subTask.setTitle("newTitle");
        expect(subTask.getTitle()).toBe(t);
    });
});