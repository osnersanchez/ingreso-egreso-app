export class User {
    uid: string;
    nombre: string;
    email: string;

    constructor( nombre: string, email:string, uid: string){
        this.email = email;
        this.nombre = nombre;
        this.uid = uid;
    }
}