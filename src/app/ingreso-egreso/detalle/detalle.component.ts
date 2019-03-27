import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import { ActivarLoadingAction, DesactivarLoadingAction } from 'src/app/shared/ui.actions';
import { AppState } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();
  public listItems = [];

  constructor(
    private store: Store<AppState>,
    private isngresosEgresosSerive: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.subscriptions.add(this.store.select('items')
      .subscribe(data => {
        this.listItems = data.items
      }));
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

  delete(uid: string) {
    console.log(uid);
    this.store.dispatch(new ActivarLoadingAction())
    this.isngresosEgresosSerive.deleteIngresoEgreso(uid)
    .finally(() => this.store.dispatch(new DesactivarLoadingAction()))
    // .then( res => {})
    
  }

}
