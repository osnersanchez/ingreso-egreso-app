import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { map } from 'rxjs/operators'
import { User as UserModel } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';
import { SetUser } from './auth.actions';
import { Subscription } from 'rxjs';

// const Swal = require('sweetalert2')

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();

  constructor(
    private aFireAuth: AngularFireAuth,
    private afDB: AngularFirestore,
    private router: Router,
    private store: Store<AppState>
  ) { }


  initAuthListener() {
    this.aFireAuth.authState.subscribe((fbUser: User) => {
      if (fbUser) {
        console.log(fbUser);

        this.userSubscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe((userObj: any) => {
            console.log(userObj);
            this.store.dispatch(new SetUser(new UserModel(userObj)))

          })
      } else {
        this.userSubscription.unsubscribe();
      }

    })
  }

  createUser(data) {
    this.store.dispatch(new ActivarLoadingAction());
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
            this.store.dispatch(new DesactivarLoadingAction());
            this.router.navigate(['/']);
          });
      }).catch(err => {
        this.store.dispatch(new DesactivarLoadingAction());
        // Swal('Error en registro', err.message, 'error');
      });
  }

  login(data) {
    this.store.dispatch(new ActivarLoadingAction());
    this.aFireAuth.auth.signInWithEmailAndPassword(data.email, data.password)
      .then(res => {
        this.store.dispatch(new DesactivarLoadingAction());
        this.router.navigate(['/']);
      }).catch(err => {
        this.store.dispatch(new DesactivarLoadingAction());
        // Swal('Error en login', err.message, 'error');
      });
  }

  logout() {
    this.router.navigate(['/login']);
    this.aFireAuth.auth.signOut();
    this.store.dispatch(new SetUser(new UserModel(null)))
  }

  isAuth() {
    return this.aFireAuth.authState
      .pipe(map((fbUser: User) => {
        !fbUser && this.router.navigate(['/login']);
        return fbUser != null
      }));
  }

}
