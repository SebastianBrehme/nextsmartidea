export class User{

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
    }
}