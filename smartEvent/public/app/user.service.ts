export class UserService{

    logedIn: boolean;
    user: any;
    
    isLogedIn():boolean{
        return this.logedIn;
    }

    setLogedIn(log:boolean):void{
        this.logedIn = log;
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