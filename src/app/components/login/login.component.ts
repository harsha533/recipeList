import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginMode: boolean = true;
  email: string = "";
  password: string = "";
  loading: boolean = false;
  errorMessage: string = "";


  constructor(private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.loading = true;
    this.isLoginMode = !this.isLoginMode;
    if (this.email && this.password) {
      this.loginService.login(this.email, this.password).subscribe((responseData) => {
        console.log(responseData);
        this.loading = false;
        this.router.navigateByUrl('/recipe');
      }, error => {
        console.log(error);
        this.loading = false;
        this.errorMessage = error;
      })
    }
    this.email = "";
    this.password = ""


  }

  onSubmitForm(form: NgForm) {
    console.log(form);
    if (!form.valid) {
      return
    }
    let email = form.value.email;
    let password = form.value.password;
    this.loading = true;
    this.loginService.signUp(email, password).subscribe((response) => {
      console.log(response);
      this.loading = false;
      this.router.navigateByUrl('/recipe');
    }, error => {
      console.log(error);
      //console.log(error.error.error.message);
      this.errorMessage = error;
      this.loading = false;
    })
    form.reset();

  }

}
