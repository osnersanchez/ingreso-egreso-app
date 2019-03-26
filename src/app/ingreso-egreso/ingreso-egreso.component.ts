import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngreEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  public formAccount: FormGroup = new FormGroup({
    description: new FormControl("", Validators.required),
    amount: new FormControl("", [Validators.required, Validators.min(0)]),
    type: new FormControl("ingreso", Validators.required)
  });

  public subscriptions: Subscription = new Subscription();
  public loading = false;

  constructor(
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
    this.subscriptions.add(this.store.select('ui').subscribe( ui => this.loading = ui.isLoading));
  }

  ngOnDestroy(){
    this.subscriptions.unsubscribe();
  }

  save() {
    this.store.dispatch(new ActivarLoadingAction())
    console.log(new IngreEgreso(this.formAccount.value));
    this.ingresoEgresoService.createIngresoEgreso(new IngreEgreso(this.formAccount.value))
    .finally(()=> this.store.dispatch(new DesactivarLoadingAction()))
    .then( val =>{
      this.formAccount.reset({amount:0, type: "ingreso"});
    })
    .catch(err => {
        console.log(err);
      });
  }

}
