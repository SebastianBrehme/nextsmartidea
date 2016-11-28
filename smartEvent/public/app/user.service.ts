export class UserService{

    logedIn: boolean;
    user: any;
    mycallback:any;

    constructor(){
        this.logedIn = false;
        this.mycallback = function(t:boolean){}
    }
    
    isLogedIn():boolean{
        return this.logedIn;
    }

    setLogedIn(log:boolean):void{
        this.logedIn = log;
        console.log('set logedIn to: '+this.logedIn);
        this.mycallback(log);
    }

    setLogedInCallback(callback:any):void{
        this.mycallback = callback;
    }

    setUser(user:any):void{
        this.user = user;
        console.log("user setUser:"+user.displayName);
        console.log('user setUser:'+user.photoURL);
    }

    getUser():any{
        return this.user;
    }
}