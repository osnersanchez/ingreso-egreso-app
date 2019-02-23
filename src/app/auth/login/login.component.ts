import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  public formLogin: FormGroup = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  public loading: boolean;
  private subcription: Subscription

  constructor( 
    private authService: AuthService,
    private store: Store<AppState>
    ) { }

  ngOnInit() {
    this.subcription = this.store.select('ui').subscribe( ui => this.loading = ui.isLoading);
  }

  ngOnDestroy(){
    this.subcription.unsubscribe();
  }

  login(){
    this.authService.login(this.formLogin.value)
  }

}
