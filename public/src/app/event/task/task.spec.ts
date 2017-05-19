import { Task } from './task';
import { SubTask } from './subTask';

describe('Task', () => 
{
    let tTask: Task;

    beforeEach(() =>
    {
        tTask = new Task("Title");
    });

    it('#Title', () =>
    {
        let task: Task = new Task("ertzu");
        expect(task.getTitle()).toBe("ertzu");
    });

    it('#Key', () => 
    {
        tTask.setKey("taskkey");
        expect(tTask.getKey()).toBe("taskkey");
        tTask.setKey("1234wertgftz765hnm");
        expect(tTask.getKey()).toBe("1234wertgftz765hnm");
    });

    it('#Set-GetSubTasks', () =>
    {
        let subtask: SubTask[] = [];
        subtask.push(new SubTask("title1"));
        subtask.push(new SubTask("title2"));
        tTask.setSubTasks(subtask);
        expect(tTask.getSubTasks()).toBe(subtask);
        let subtask2: SubTask[] = [];
        subtask2.push(new SubTask("title3"));
        subtask2.push(new SubTask("title4"));
        tTask.setSubTasks(subtask2);
        expect(tTask.getSubTasks()).toBe(subtask2);

    });

    it('#Add-GetSubTasks', () =>
    {
        let subtask: SubTask[] = [];
        subtask.push(new SubTask("title1"));
        subtask.push(new SubTask("title2"));
        tTask.setSubTasks(subtask);
        expect(tTask.getSubTasks()).toBe(subtask);
        tTask.addSubTask(new SubTask("title3"));
        subtask.push(new SubTask("title3"));
        expect(tTask.getSubTasks()).toBe(subtask);

        let subtask2: SubTask[] = [];
        subtask2.push(new SubTask("title4"));
        tTask.setSubTasks(subtask2);
        expect(tTask.getSubTasks()).toBe(subtask2);
        tTask.addSubTask(new SubTask("title5"));
        subtask2.push(new SubTask("title5"));
        expect(tTask.getSubTasks()).toBe(subtask2);
    });

    it('#Remove-GetSubTasks', () => 
    {
        let subtask: SubTask[] = [];
        subtask.push(new SubTask("title1"));
        subtask.push(new SubTask("title2"));
        tTask.setSubTasks(subtask);
        expect(tTask.getSubTasks()).toBe(subtask);
        tTask.removeSubTask(1);
        subtask.pop();
        expect(tTask.getSubTasks()).toBe(subtask);
        tTask.addSubTask(new SubTask("title3"));
        subtask.push(new SubTask("title3"));
        expect(tTask.getSubTasks()).toBe(subtask);
        tTask.removeSubTask(0);
        subtask.splice(0, 1);
        expect(tTask.getSubTasks()).toBe(subtask);
    });
});