import {Answer} from './answer';
import {Member} from '../member';

export class Survey {
    key: string;
    author: string;

    title: string;
    multiple: boolean;
    question: string;
    answers: Answer[];

    constructor(title: string){
        this.title = title;

        this.key = "";
        this.author = "";
        this.multiple = false;
        this.question = "";
        this.answers = [];
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
    setTitel(title:string){
        this.title = title;
    }

    getMultiple(): boolean {
        return this.multiple;
    }
    setMultiple(multiple:boolean){
        this.multiple = multiple;
    }

    getQuestion():string{
        return this.question;
    }
    setQuestion(question:string){
        this.question = question;
    }

    getAnswers(): Answer[]{
        return this.answers;
    }
    setAnswers(answers:Answer[]){
        this.answers = answers;
    }

    hasVoted(member:Member):Answer[]{
        let ret:Answer[] = [];
        for(let tanswer of this.answers){
            if(tanswer.hasVoted(member)){
                ret.push(tanswer);
            }
        }
        return ret;
    }

}