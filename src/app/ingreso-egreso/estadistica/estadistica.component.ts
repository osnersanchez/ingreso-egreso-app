import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Label } from 'ng2-charts';
import { AppState } from '../ingreso-egreso.reducer';

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

  // Doughnut
  public doughnutChartLabels: Label[] = ['Egresos','Ingresos'];
  public doughnutChartData: number[] = [];

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
            this.doughnutChartData = [this.amountEgreso,this.amountIngreso]
          });
      }));

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
