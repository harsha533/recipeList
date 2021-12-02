import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';

import { RecipBookComponent } from '../components/recipe/recip-book/recip-book.component';
import { RecipeDetailsComponent } from '../components/recipe/recip-book/recipe-details/recipe-details.component';
import { RecipeEditComponent } from '../components/recipe/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from '../components/recipe/recipe-start/recipe-start.component';
import { ShoppingListComponent } from '../components/shopping/shopping-list/shopping-list.component';
import { ResolverRecipeGuard } from '../shared/resolver-recipe.guard';

const routes: Routes = [
  {
    path: 'recipe', component: RecipBookComponent, children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailsComponent, resolve: [ResolverRecipeGuard] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [ResolverRecipeGuard] },
     
    ]
  },
  { path: 'shopping', component: ShoppingListComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/recipe', pathMatch: 'full' }]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
