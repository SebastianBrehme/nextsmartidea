export class UserService{

    logedIn: boolean;
    user: any;
    mycallback:any[];

    constructor(){
        this.logedIn = false;
        this.mycallback = [];
    }
    
    isLogedIn():boolean{
        return this.logedIn;
    }

    setLogedIn(log:boolean):void{
        this.logedIn = log;
        //console.log('set logedIn to: '+this.logedIn);
        for(let callbacks in this.mycallback){
            this.mycallback[callbacks](log);
        }
    }

    setLogedInCallback(callback:any):void{
        this.mycallback.push(callback);
    }

    setUser(user:any):void{
        this.user = user;
    }

    getUser():any{
        return this.user;
    }
}