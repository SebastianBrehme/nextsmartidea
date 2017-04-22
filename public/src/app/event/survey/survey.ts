export class Survey {
    key: string;
    author: string;

    title: string;
    multiple: boolean;
    question: string;
    answers: string[];

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

    getAnswers(): string[]{
        return this.answers;
    }
    setAnswers(answers:string[]){
        this.answers = answers;
    }

}