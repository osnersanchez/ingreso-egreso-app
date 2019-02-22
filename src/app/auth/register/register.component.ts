import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  public formRegister: FormGroup = new FormGroup({
    name: new FormControl("",Validators.required),
    email: new FormControl("",Validators.required),
    password: new FormControl("",Validators.required)
  })

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  createUser(){
    this.authService.createUser(this.formRegister.value)
  }

}
