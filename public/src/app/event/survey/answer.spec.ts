import {Answer} from './Answer';
import {Member} from '../Member';

describe('Answer',()=>{
    let answer:Answer;
    let astring = "Ja";
    let members:Member[] = [];
    
    beforeEach(()=>{
        answer = new Answer(astring)
        members.push(new Member('eins','id'));
        members.push(new Member('zwei','ida'));
    });

    it('#getAnswer should return Answerstring',()=>{
        expect(answer.getAnswer()).toBe(astring);
    });

    it('#getVotes and setVotes should work',()=>{
        answer.setVotes(members);
        expect(answer.getVotes()).toBe(members);
    });

    it('#getVotesCount should return acutal number of votes',()=>{
        expect(answer.getVotesCount()).toBe(0);
        answer.vote(new Member('mail','id'));
        answer.vote(new Member('mail','id'));
        expect(answer.getVotesCount()).toBe(2);
        answer.unVote(new Member('mail','id'));
        expect(answer.getVotesCount()).toBe(1);    
    });

   it('#vote should save Member in Votelist',()=>{
        answer.vote(new Member('mail','id'));
        expect(answer.getVotesCount()).toBe(1);
        expect(answer.hasVoted(new Member('mail','id'))).toBeTruthy();
    });

    it('#unVote should remove a Member if he as voted',()=>{
        answer.setVotes(members);
        answer.unVote(new Member('eins','id'));
        expect(answer.hasVoted(new Member('eins','id'))).toBeFalsy();
        answer.unVote(new Member('eins','id'));
        expect(answer.hasVoted(new Member('eins','id'))).toBeFalsy();
    });

    it('#hasVoted should return if Member has voted',()=>{
        let member:Member = new Member('eins','id');
        let nmember:Member = new Member('zehn','1234');
        answer.setVotes(members);
        expect(answer.hasVoted(member)).toBeTruthy();
        expect(answer.hasVoted(nmember)).toBeFalsy();

        answer.vote(nmember);
        expect(answer.hasVoted(nmember)).toBeTruthy();
    });


});