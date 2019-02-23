export class User {
    uid: string;
    nombre: string;
    email: string;

    constructor( userObj: UserData){
        this.email = userObj && userObj.email || null;
        this.nombre = userObj && userObj.nombre || null;
        this.uid = userObj && userObj.uid || null;
    }
}

interface UserData  {
    email: string,
    nombre: string,
    uid: string,
}