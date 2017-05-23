import {Member} from '../member';

export class Answer{

    answer: string;
    votes: Member[];

    constructor(canswer:string){
        this.answer = canswer;
        this.votes = [];
    }

    getVotesCount():number{
        return this.votes.length;
    }

    getAnswer():string{
        return this.answer;
    }

    getVotes():Member[]{
        return this.votes;
    }
    setVotes(votes:Member[]){
        this.votes = votes;
    }

    vote(member:Member):void{
        this.votes.push(member);
    }

    unVote(member:Member):void{
        let n = 0;
        for(let tmember in this.votes){           
            if(this.votes[tmember].equals(member)){
                this.votes.splice(n,1);
            }
            n++;
        }
    }

    hasVoted(member:Member):boolean{
        for(let tmember of this.votes){
            if(tmember.equals(member)){
                return true;
            }
        }
        return false;
    }    
}