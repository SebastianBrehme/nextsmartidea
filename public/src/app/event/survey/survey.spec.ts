import { Survey } from './survey';
import { Answer } from './answer';
import {Member} from '../member';

describe('Survey', () => 
{
    let survey: Survey;
    let ans: Answer[];

    beforeEach(() =>
    {
        survey = new Survey("title");
        ans = [];
        let a: Answer = new Answer("yes");
        a.vote(new Member("test@mail.com", "rtzh3n4rtg7r4"));
        a.vote(new Member("email@test.com", "id"));
        let b: Answer = new Answer("No");
        ans.push(a);
        ans.push(b);
    });

    it('#Title', () => 
    {
        expect(survey.getTitle()).toBe("title");
        survey.setTitel("newTitle");
        expect(survey.getTitle()).toBe("newTitle");
    });

    it('#Key', () =>
    {
        survey.setKey("345rt6zhr5rt6z32t4grdgtn");
        expect(survey.getKey()).toBe("345rt6zhr5rt6z32t4grdgtn");
        let key: string = "345tgve456zfghurg7u";
        survey.setKey(key);
        expect(survey.getKey()).toBe(key);
    });

    it('#Author', () =>
    {
        survey.setAuthor("author");
        expect(survey.getAuthor()).toBe("author");
    });

    it('#Selection Type', () =>
    {
        survey.setMultiple(false);
        expect(survey.getMultiple()).toBeFalsy();
        survey.setMultiple(true);
        expect(survey.getMultiple()).toBeTruthy();
    });

    it('#Question', () =>
    {
        survey.setQuestion("question to life the universe and everything?");
        expect(survey.getQuestion()).toBe("question to life the universe and everything?");
    });

    it('#Answers', () =>
    {
        let answers: Answer[] = [];
        answers.push(new Answer("42"));
        answers.push(new Answer("43"));
        survey.setAnswers(answers);
        expect(survey.getAnswers()).toBe(answers);
    });

    it('#VotesCount', () =>
    {
        survey.setAnswers(ans);
        expect(survey.getAllVotesCount()).toBe(2);
    });
});