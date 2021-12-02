import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../../model/recipe';
import { RecipeService } from '../../services/recipe/recipe.service';
import { RecipeEditModeService } from '../../services/recipe-edit-mode.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private recipeEditMode: RecipeEditModeService) { }

  ngOnInit(): void {

    this.recipeService.recipesObservable$.subscribe((data) => {
      this.recipes = data;
    });
    this.recipes = this.recipeService.getRecipes();
  }

  newRecipe() {
    this.router.navigateByUrl('/recipe/new');
    this.recipeEditMode.setEditMode(false);
  }

  


}
