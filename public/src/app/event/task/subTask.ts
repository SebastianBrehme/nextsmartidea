export class SubTask {

    key: string;
    title: string;
    who: string = "--";
    done: boolean = false;
    eventkey: string = "";

    constructor(title: string){
        this.title = title;
    }

    getKey():string{
        return this.key;
    }

    setKey(key:string){
        this.key = key;
    }

    setWho(mail: string){
        this.who = mail;
    }

    getWho(): string{
        return this.who;
    }

    setDone(ddone: boolean){
        this.done = ddone;
    }

    getDone(): boolean{
        return this.done; 
    }

    setTitle(ttitle: string){
        this.title = ttitle;
    }

    getTitle(): string {
        return this.title;
    }

    getEventKey():string{
        return this.eventkey;
    }

    getUserSubTask(user:string,key:string, subtasks:SubTask[]):void{
        if(user == this.who){
            this.eventkey = key;
            subtasks.push(this);
        }
    }
}