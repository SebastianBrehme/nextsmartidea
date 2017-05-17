import {Task} from './task';

describe('Task', () => 
{
    it('#Title', ()=>
    {
        let task: Task = new Task("ertzu");
        expect(task.getTitle()).toBe("ertzu");
    });
});