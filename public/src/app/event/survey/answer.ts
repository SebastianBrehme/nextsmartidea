import {Member} from '../member';

export class Answer{

    answer: string;
    votes: Member[];

    constructor(canswer:string){
        this.answer = canswer;
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

    hasVotedFor(member:Member):boolean{
        for(let m of this.votes){
            if(m.getEmail()==member.getEmail()){
                return true;
            }
        }
        return false;
    }

    voteFor(member:Member):void{
        this.votes.push(member);
    }

    unVote(member:Member):void{
        //for(let tmember in this.votes){
        //    if(this.votes[tmember].equals(member)){
        //        this.votes.splice(tmember,1)
        //    }
        //}
        let index = this.votes.indexOf(member);
        if(index>-1){
            this.votes.splice(index,1);
        }else{
            console.log('member not found '+member);
            console.log('hasVoted '+this.hasVoted(member));
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