import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from 'src/app/components/shopping/model/ingredient';
import { Recipe } from '../../model/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    
  ];

  recipe: Recipe;
  public recipesObservable$: Subject<Recipe[]> = new Subject<Recipe[]>()
  public recipeEventEmitter = new EventEmitter<Recipe>();

  constructor() { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesObservable$.next(this.recipes);
  }

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipeById(index: number): Recipe {

    return this.getRecipes().slice()[index];

  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesObservable$.next([...this.recipes]);
  }

  updateRecipeById(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesObservable$.next([...this.recipes]);
  }

  deleteRecipeById(index: number) {
    this.recipes.splice(index, 1);
    this.recipesObservable$.next([...this.recipes]);
  }
}
