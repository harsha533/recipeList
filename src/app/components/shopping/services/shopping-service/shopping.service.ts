import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../../model/ingredient';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 20),
    new Ingredient('Mango', 15)];

  public ingredientsEmitter = new EventEmitter<Ingredient[]>();
  ingredientsObservable$: Subject<Ingredient[]> = new Subject<Ingredient[]>();
  ingredientEditIndex$: Subject<number> = new Subject<number>();
  constructor() { }

  getIngredientsList(): Ingredient[] {
    return this.ingredients.slice();

  }
  addShoppingIngredient(indregient: Ingredient) {
    if (!this.checkIngredientsExists(indregient)) {
      this.ingredients.push(indregient);
      this.ingredientsObservable$.next(this.ingredients);
      //this.ingredientsEmitter.emit(this.ingredients.slice());
    }
  }

  addShoppingIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsObservable$.next(this.ingredients);
    //this.ingredientsEmitter.emit(this.ingredients);
  }

  checkIngredientsExists(ingredient: Ingredient): boolean {
    return this.ingredients.some((value) => value.name === ingredient.name);
  }

  getIngredientData(index: number) {
    return this.ingredients[index];
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsObservable$.next(this.ingredients);
  }

  updateEditIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsObservable$.next(this.ingredients);
  }
}
