export class Member{

    email:string;
    id:string;

    constructor(email:string, id:string){
        this.email = email;
        this.id = id;
    }

    getEmail():string{
        return this.email;
    }

    getID():string{
        return this.id;
    }

    equals(member:Member):boolean{
        return member.email == this.email && member.id == this.id;
    }
}