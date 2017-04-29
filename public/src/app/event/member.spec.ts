import {Member} from './member';

describe('Member', () =>{

    it('#Email', ()=>{
        let member:Member = new Member("abc@def.gh","asf165f");
        expect(member.equals(member)).toBeTruthy();
        let member2:Member = new Member("abc@def.gh","asf165f");
        expect(member.equals(member2)).toBeTruthy();
        member.email="neue@mai.com";
        expect(member.equals(member2)).toBeFalsy();
        member.email=member2.email;
        member.id="neue";
        expect(member.equals(member2)).toBeFalsy();
    });

});