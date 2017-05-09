import {Member} from './member';
import {Survey} from './survey/survey';
export class Event {
    key: string;
    author: string;

    title: string;
    description: string;
    type: string;
    date_from: Date;
    date_to: Date;
    location: string;
    member: Member[];
    survey: Survey[];
    chatkey:string;
    date_fromShortString: string;

    constructor(title:string) {
        this.title = title;
        this.key ='';
        this.author='';
        this.description='';
        this.type='';
        this.date_from = new Date();
        this.date_to = new Date();
        this.location = '';
        this.chatkey = '';
        this.member=[];
        this.survey=[];
        this.date_fromShortString = '';
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
        return this.title;
    }
    setTitle(title:string){
        this.title = title;
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
        this.date_from = date_from;//new Date(date_from);
    }

    getDateTo():Date{
        return this.date_to
    }
    setDateTo(date_to:Date){
        this.date_to = date_to;//new Date(date_to);
    }

    getLocation():string{
        return this.location;
    }
    setLocation(location:string){
        this.location = location;
    }

    getMember():Member[]{
        return this.member;
    }
    setMember(member:Member[]){
        this.member = member;
    }

    getSurvey():Survey[]{
        return this.survey;
    }
    setSurvey(survey:Survey[]){
        this.survey = survey;
    }

    getChatKey():string{
        return this.chatkey;
    }
    setChatKey(key:string):void{
        this.chatkey = key;
    }

    getDateFromShortString():string{
        return this.date_fromShortString
    }
    setDateFromShortString(date_fromString:string){
        this.date_fromShortString = date_fromString;
    }

}