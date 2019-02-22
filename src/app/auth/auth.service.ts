import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { map } from 'rxjs/operators'
import { User as UserModel } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

// const Swal = require('sweetalert2')

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private aFireAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private router: Router) { }


  initAuthListener() {
    this.aFireAuth.authState.subscribe((fbUser: User) => {
      console.log(fbUser);

    })
  }

  createUser(data) {
    this.aFireAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
      .then(res => {
        let user: UserModel = {
          uid: res.user.uid,
          nombre: data.name,
          email: data.email
        }
        this.afDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then(_ => {
            this.router.navigate(['/']);
          });
      }).catch(err => {
        // Swal('Error en registro', err.message, 'error');
      });
  }

  login(data) {
    this.aFireAuth.auth.signInWithEmailAndPassword(data.email, data.password)
      .then(res => {
        this.router.navigate(['/']);
      }).catch(err => {
        // Swal('Error en login', err.message, 'error');
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.aFireAuth.auth.signOut();
  }

  isAuth() {
    return this.aFireAuth.authState
      .pipe(map((fbUser: User) => {
        !fbUser && this.router.navigate(['/login']);
        return fbUser != null
      }));
  }

}
