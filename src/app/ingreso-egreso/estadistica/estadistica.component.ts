import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { SetItemsAction } from '../ingreso-egreso.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  public quantityIngreso = 0;
  public quantityEgreso = 0;
  public amountIngreso = 0;
  public amountEgreso = 0;

  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.subscription.add(this.store.select('items')
      .subscribe(data => {
        this.quantityEgreso = 0;
        this.quantityIngreso = 0;
        data.items.forEach(item => {
          item.type === 'ingreso' ? this.quantityIngreso++ : this.quantityEgreso++;
          item.type === 'ingreso' ? this.amountIngreso += item.amount : this.amountEgreso += item.amount;
        });
      }));

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
