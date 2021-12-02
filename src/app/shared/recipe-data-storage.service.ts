import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';

import { Recipe } from '../components/recipe/model/recipe';
import { RecipeService } from '../components/recipe/services/recipe/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeDataStorageService {

  constructor(private http: HttpClient,
    private recipeService: RecipeService) { }

  storeData() {
    const RECIPE = this.recipeService.getRecipes();
    this.http.put('https://recipe-and-shopping-b32a9-default-rtdb.firebaseio.com/recipe.json', RECIPE).
      subscribe((response) => {
        console.log(response);

      })
  }

  fetchData() {
    return this.http.get<Recipe[]>('https://recipe-and-shopping-b32a9-default-rtdb.firebaseio.com/recipe.json').
      pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
          })
        }),
        tap((response) => {
          console.log(response);
          this.recipeService.setRecipes(response);
        })
      )
  }
}
