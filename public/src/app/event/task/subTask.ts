export class SubTask {

    title: string;
    who: string = "--";
    done: boolean = false;

    constructor(title: string){
        this.title = title;
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
}