import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  public userName = ''
  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription.add(this.store.select('user')
      .subscribe(data => {
        data.user && (this.userName = data.user.nombre);
      }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
