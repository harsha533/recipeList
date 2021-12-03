import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { AlertComponent } from "src/app/shared/Alert-Window/alert/alert.component";
import { PlaceholderDirective } from "src/app/shared/directives/placeholder.directive";
import { IAuthResponse, LoginService } from "./services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  isLoginMode: boolean = true;
  email: string = "";
  password: string = "";
  loading: boolean = false;
  errorMessage: string = "";
  @ViewChild(PlaceholderDirective, { static: true })
  alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private componentResolverFactory: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}

  onSwitchMode() {
    //this.loading = true;
    this.isLoginMode = !this.isLoginMode;
    // if (this.email && this.password) {
    //   this.loginService.login(this.email, this.password).subscribe((responseData) => {
    //     console.log(responseData);
    //     this.loading = false;
    //     this.router.navigateByUrl('/recipe');
    //   }, error => {
    //     console.log(error);
    //     this.loading = false;
    //     this.errorMessage = error;
    //   })
    // }
    // this.email = "";
    // this.password = ""
  }

  onSubmitForm(form: NgForm) {
    console.log(form);
    if (!form.valid) {
      return;
    }
    let email = form.value.email;
    let password = form.value.password;
    let authObservable$: Observable<IAuthResponse>;
    this.loading = true;
    console.log(this.isLoginMode);
    if (this.isLoginMode) {
      authObservable$ = this.loginService.login(email, password);
    } else {
      authObservable$ = this.loginService.signUp(email, password);
    }

    authObservable$.subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl("/recipe");
        this.loading = false;
      },
      (error) => {
        console.log(error);
        this.errorMessage = error;
        this.showErrorAlert(error);
        this.loading = false;
      }
    );
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory =
      this.componentResolverFactory.resolveComponentFactory(AlertComponent);

    const hostViewContainer = this.alertHost.viewContainerRef;
    hostViewContainer.clear();

    const componentRef = hostViewContainer.createComponent<AlertComponent>(
      alertComponentFactory
    );
    componentRef.instance.message = message;
   this.closeSub = componentRef.instance.closeHandler.subscribe((data) => {
     console.log(data);
     
     this.closeSub.unsubscribe();
     hostViewContainer.clear();
   });
  }
}
