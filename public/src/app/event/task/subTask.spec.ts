import {SubTask} from './subTask';

describe('SubTask', () =>{
    let subTask: SubTask;

    beforeEach(() =>
    {
        subTask = new SubTask("Title");
    });

    it('#title', () =>{
        expect(subTask.getTitle()).toBe("Title");
        let t: string = "newTitle";
        subTask.setTitle("newTitle");
        expect(subTask.getTitle()).toBe(t);
    });

    it('#Key', () => 
    {
        subTask.setKey("2rqfgh4eavz34bv7");
        expect(subTask.getKey()).toBe("2rqfgh4eavz34bv7");
        subTask.setKey("rtvgbhngt567zhugvfrtgzh");
        expect(subTask.getKey()).toBe("rtvgbhngt567zhugvfrtgzh");
    });

    it('#Done', () =>
    {
        subTask.setDone(true);
        expect(subTask.getDone()).toBeTruthy();
        subTask.setDone(false);
        expect(subTask.getDone()).toBeFalsy();
    });

    it('#EventKey', () =>
    {
        subTask.eventkey = "unrvwubvzeua3wr7824gh";
        expect(subTask.getEventKey()).toBe("unrvwubvzeua3wr7824gh");
    });
});