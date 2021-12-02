import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService } from 'primeng/api';

import { AppComponent } from './app.component';
import { RecipBookComponent } from './components/recipe/recip-book/recip-book.component';
import { RecipeListComponent } from './components/recipe/recip-book/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './components/recipe/recip-book/recipe-details/recipe-details.component';
import { RecipeItemComponent } from './components/recipe/recip-book/recipe-details/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './components/shopping/shopping-list/shopping-list.component';
import { HeaderComponent } from './components/header/header.component';
import { PrimeNgModuleModule } from './prime-ng-module/prime-ng-module.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ShoppingEditComponent } from './components/shopping/shopping-list/shopping-edit/shopping-edit.component';
import { MaterialModule } from './material/material.module';
import { RecipeService } from './components/recipe/services/recipe/recipe.service';
import { RecipeStartComponent } from './components/recipe/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './components/recipe/recipe-edit/recipe-edit.component';
import { RecipeDataStorageService } from './shared/recipe-data-storage.service';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './components/login/services/login.service';
import { AuthInterceptorService } from './components/login/interceptors/auth-interceptor.service';

@NgModule({
    declarations: [
        AppComponent,
        RecipBookComponent,
        RecipeListComponent,
        RecipeDetailsComponent,
        RecipeItemComponent,
        ShoppingListComponent,
        HeaderComponent,
        ShoppingEditComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        PrimeNgModuleModule,
        AppRoutingModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    providers: [ConfirmationService, RecipeService, RecipeDataStorageService, LoginService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule { }
