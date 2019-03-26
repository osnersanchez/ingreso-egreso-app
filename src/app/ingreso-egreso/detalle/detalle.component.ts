import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription = new Subscription();
  public listItems = [];

  constructor(
    private store: Store<AppState>
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
    
  }

}
