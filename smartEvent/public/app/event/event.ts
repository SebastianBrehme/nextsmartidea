export class Event{
    id: string;
    author: string;
    
    name: string;
    description: string;
    type: string;
    date_from: Date;
    date_to: Date;
    member: Object;

    constructor(obj?:Object){
        console.log('constructor');
        if(obj){
        this.author = obj.AUTHOR;
        }
    }
}