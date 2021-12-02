import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../components/recipe/model/recipe';
import { RecipeService } from '../components/recipe/services/recipe/recipe.service';
import { RecipeDataStorageService } from './recipe-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ResolverRecipeGuard implements Resolve<Recipe[]> {

  constructor(private dataStorage: RecipeDataStorageService,
    private recipeService: RecipeService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    let recipes = this.recipeService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorage.fetchData();
    }
    else {
      return recipes;
    }

  }

}
