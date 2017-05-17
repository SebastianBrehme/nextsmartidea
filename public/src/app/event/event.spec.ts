import {Event} from './event';
import {Member} from './member';
import {Survey} from './survey/survey';

describe('Event', () =>{
    let event: Event;
    let titel = "Ostern";
    beforeEach(()=>{event = new Event(titel);});


    it('#Title', ()=>{
        expect(event.getTitle()).toBe(titel);
        titel = "Neuer Titel";
        event.setTitle(titel);
        expect(event.getTitle()).toBe(titel);
    });

    it('#Key', ()=>{
        expect(event.getKey()).toBe('');
        let key = "NeuerKey-52";
        event.setKey(key);
        expect(event.getKey()).toBe(key);
    });

    it('#Author', ()=>{
        expect(event.getAuthor()).toBe('');
        let author = "Author-588author";
        event.setAuthor(author);
        expect(event.getAuthor()).toBe(author);
    });

    it('#Description', ()=>{
        expect(event.getDescription()).toBe('');
        let des = "Neue Beschreibung für Event";
        event.setDescription(des);
        expect(event.getDescription()).toBe(des);
    });

    it('#Type', ()=>{
        expect(event.getType()).toBe('');
        let type = "Party";
        event.setType(type);
        expect(event.getType()).toBe(type);
    });

    it('#Location', ()=>{
        expect(event.getLocation()).toBe('');
        let location = "Karlsruhe";
        event.setLocation(location);
        expect(event.getLocation()).toBe(location);
    });

    it('#Chatkey', ()=>{
        expect(event.getChatKey()).toBe('');
        let key = "aksdjg43asökld44";
        event.setChatKey(key);
        expect(event.getChatKey()).toBe(key);
    });

    it('#DateFrom', ()=>{
        let date = new Date();
        event.setDateFrom(date);
        expect(event.getDateFrom()).toBe(date);
    });

    it('#DateTo', ()=>{
        let date = new Date();
        event.setDateTo(date);
        expect(event.getDateTo()).toBe(date);
    });

    it('#Member', ()=>{
        let member:Member[] = [];
        member.push(new Member("asd@fgh.de", "qwer1234"));
        event.setMember(member);
        expect(event.getMember()).toBe(member);
        let member2:Member[] = [];
        member2.push(new Member("tzui@iop.de", "gbhjn123"));
        member2.push(new Member("vbn@ghj.com", "67zui"));
        event.setMember(member2);
        expect(event.getMember()).toBe(member2);
    });

    it('#Survey', ()=>{
        let survey:Survey[] = [];
        event.setSurvey(survey);
        expect(event.getSurvey()).toBe(survey);
        survey.push(new Survey("title"));
        event.setSurvey(survey);
        expect(event.getSurvey()).toBe(survey);
    });

    it('#ShortDateString', ()=>{
        expect(event.getDateFromShortString()).toBe('');
        let date = "Neues Datum";
        event.setDateFromShortString(titel);
        expect(event.getDateFromShortString()).toBe(titel);
    });
});