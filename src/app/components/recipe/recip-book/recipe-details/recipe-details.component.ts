import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Ingredient } from 'src/app/components/shopping/model/ingredient';
import { ShoppingService } from 'src/app/components/shopping/services/shopping-service/shopping.service';
import { Recipe } from '../../model/recipe';
import { RecipeEditModeService } from '../../services/recipe-edit-mode.service';
import { RecipeService } from '../../services/recipe/recipe.service';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipeFromRecipeBook: Recipe;
  recipeIndex: number;
  manageRecipe: { name: string, code: string }[] = [
    { name: 'To the ShoppingList', code: 'SL' },
    { name: 'Edit Recipe', code: 'ER' },
    { name: 'Delete Recipe', code: 'DR' },
  ];

  selectedManageRecipe: { name: string, code: string };

  constructor(private recipeService: RecipeService,
    private slService: ShoppingService,
    private route: ActivatedRoute,
    private router: Router,
    private recipeEditMode: RecipeEditModeService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      this.recipeIndex = +param.get('id');
      this.recipeFromRecipeBook = this.recipeService.getRecipeById(this.recipeIndex);
      console.log(this.recipeFromRecipeBook);
      
    })
  }

  toShoppingList(event: Event) {
    // console.log(event['code']);
    if (event['code'] === "ER") {
      const edit = true;
      this.router.navigateByUrl('/recipe/' + this.recipeIndex + '/edit');
      this.recipeEditMode.setEditMode(true);
    }
    else if (event['code'] === "SL") {
      this.slService.addShoppingIngredients(this.recipeFromRecipeBook.ingredients);
    }
    else if(event['code'] === "DR") {
      this.recipeService.deleteRecipeById(this.recipeIndex);
      this.router.navigateByUrl('/recipe');
    }

  }




}
