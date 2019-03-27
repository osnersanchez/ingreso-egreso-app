import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SetItemsAction } from './ingreso-egreso.actions';
import { IngreEgreso } from './ingreso-egreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  private subscription: Subscription = new Subscription();
  private userUid: string = null;

  constructor(
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) {
    this.subscription.add(this.store.select('user')
      .pipe(filter(data => data.user && data.user.uid ? true : false))
      .subscribe(data => {
        this.userUid = data.user.uid
        this.ingrsoEgresosItems(data.user.uid);
      }));
  }

  destroyEgresoListener() {
    this.subscription.unsubscribe();

  }

  private ingrsoEgresosItems(uid: string) {
    this.subscription.add(this.afDB.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(map(list => {
        return list.map(val => {
          return new IngreEgreso({
            uid: val.payload.doc.id,
            ...val.payload.doc.data()
          })
        })
      }))
      .subscribe((list: any[]) => {
        this.store.dispatch(new SetItemsAction(list))
      }));
  }

  createIngresoEgreso(ingresoEgreso) {
    // if (this.userUid)

    return this.afDB.doc(`${this.userUid}/ingresos-egresos`)
      .collection('items').add({ ...ingresoEgreso })
    // .subscribe((userObj: any) => {
    //   console.log(userObj);
    //   this.store.dispatch(new SetUser(new UserModel(userObj)))

    // })
  }

  deleteIngresoEgreso(uid: string) {
    return this.afDB.doc(`${this.userUid}/ingresos-egresos/items/${uid}`)
      .delete()
  }

}
