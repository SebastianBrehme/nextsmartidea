import {UserService} from './user.service';

describe('UserServie', () =>{
    let user:UserService;
    beforeEach(()=> {user = new UserService();});


    it('#Default', ()=>{
        expect(user.isLogedIn()).toBeFalsy();
    });

    it('#Callback',()=>{
        expect(user.mycallback.length).toBe(0);
        let callback = function(l:boolean){
            expect(l).toBe(user.isLogedIn());
        }
        user.setLogedInCallback(callback);
        expect(user.mycallback.length).toBe(1);
        user.setLogedIn(true);
    });

});