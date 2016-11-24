export class Event {
    key: string;
    author: string;

    titel: string;
    description: string;
    type: string;
    date_from: Date;
    date_to: Date;
    member: string[];

    constructor(title:string) {
        this.titel = title;
        this.key ='';
        this.author='';
        this.description='';
        this.type='';
        this.date_from = new Date();
        this.date_to = new Date();
        this.member=[];
    }

    getKey():string{
        return this.key
    }
    setKey(key:string){
        this.key = key;
    }

    getAuthor():string{
        return this.author
    }
    setAuthor(author:string){
        this.author = author;
    }

    getTitle():string{
        return this.titel;
    }
    setTitel(titel:string){
        this.titel = titel;
    }

    getDescription():string{
        return this.description
    }
    setDescription(description:string){
        this.description = description;
    }

    getType():string{
        return this.type
    }
    setType(type:string){
        this.type = type;
    }

    getDateFrom():Date{
        return this.date_from
    }
    setDateFrom(date_from:Date){
        this.date_from = date_from;
    }

    getDateTo():Date{
        return this.date_to
    }
    setDateTo(date_to:Date){
        this.date_to = date_to;
    }

    getMember():string[]{
        return this.member;
    }
    setMember(member:string[]){
        this.member = member;
    }

}