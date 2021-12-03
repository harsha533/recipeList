import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ResolverRecipeGuard } from "src/app/shared/resolver-recipe.guard";
import { AuthGuard } from "../login/AuthGuards/auth.guard";
import { RecipBookComponent } from "./recip-book/recip-book.component";
import { RecipeDetailsComponent } from "./recip-book/recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";

const routes: Routes = [
  {
    path: "",
    component: RecipBookComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: RecipeStartComponent },
      { path: "new", component: RecipeEditComponent },
      {
        path: ":id",
        component: RecipeDetailsComponent,
        resolve: [ResolverRecipeGuard],
      },
      {
        path: ":id/edit",
        component: RecipeEditComponent,
        resolve: [ResolverRecipeGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
