import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/recipe", pathMatch: "full" },
  {
    path: "recipe",
    loadChildren: () =>
      import("../components/recipe/recipe.module").then((m) => m.RecipeModule),
  },
  {
    path: "shopping",
    loadChildren: () =>
      import("../components/shopping/shopping.module").then(
        (m) => m.ShoppingModule
      ),
  },
  {
    path: "login",
    loadChildren: () =>
      import("../components/login/login.module").then((m) => m.LoginModule),
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
