import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ConfirmationService } from "primeng/api";
import { TableModule } from "primeng/table";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { AuthInterceptorService } from "./components/login/interceptors/auth-interceptor.service";
import { LoginService } from "./components/login/services/login.service";
import { RecipeService } from "./components/recipe/services/recipe/recipe.service";
import { MaterialModule } from "./material/material.module";
import { PrimeNgModuleModule } from "./prime-ng-module/prime-ng-module.module";
import { RecipeDataStorageService } from "./shared/recipe-data-storage.service";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    HttpClientModule,
    PrimeNgModuleModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [
    ConfirmationService,
    RecipeService,
    RecipeDataStorageService,
    LoginService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
