import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AppState } from 'src/app/reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  public formRegister: FormGroup = new FormGroup({
    name: new FormControl("",Validators.required),
    email: new FormControl("",Validators.required),
    password: new FormControl("",Validators.required)
  });

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

  createUser(){
    this.authService.createUser(this.formRegister.value)
  }

}
