import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../services/recipe/recipe.service';

@Component({
  selector: 'app-recip-book',
  templateUrl: './recip-book.component.html',
  styleUrls: ['./recip-book.component.css']
})
export class RecipBookComponent implements OnInit {

  selectedRecipe: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.recipeEventEmitter.subscribe((recipe) => {
      this.selectedRecipe = recipe;
    })
  }



}
