import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { IngresoEgresoService } from 'src/app/ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public userName = ''
  private subscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private ingresoEgresoService: IngresoEgresoService,
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

  logout(){
    this.authService.logout();
    this.ingresoEgresoService.destroyEgresoListener();
  }

}
