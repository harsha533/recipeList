import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RecipeRoutingModule } from "./recipe-routing.module";
import { RecipBookComponent } from "./recip-book/recip-book.component";
import { RecipeDetailsComponent } from "./recip-book/recipe-details/recipe-details.component";
import { RecipeItemComponent } from "./recip-book/recipe-details/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recip-book/recipe-list/recipe-list.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PrimeNgModuleModule } from "src/app/prime-ng-module/prime-ng-module.module";
import { MaterialModule } from "src/app/material/material.module";

@NgModule({
  declarations: [
    RecipBookComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  exports: [
    RecipBookComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModuleModule,
    MaterialModule
  ],
})
export class RecipeModule {}
