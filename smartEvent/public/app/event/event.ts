export class Event {
    key: string;
    author: string;

    titel: string;
    description: string;
    type: string;
    date_from: Date;
    date_to: Date;
    member: string[];

    constructor(obj?: any, key?:string) {
        if (obj && key) {
            this.key = key;
            this.author = obj.AUTHOR;
            this.titel = obj.TITEL;
        }
    }
}