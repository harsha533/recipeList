import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeEditModeService } from '../services/recipe-edit-mode.service';
import { RecipeService } from '../services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeEditIndex: number;
  recipeForm: FormGroup;
  editMode: boolean = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private recipeEditMode: RecipeEditModeService,
    private recipeService: RecipeService) { }

  ngOnInit(): void {

    this.route.params
      .subscribe(
        (param: Params) => {
          this.recipeEditIndex = +param['id'];
        })
    this.editMode = this.recipeEditMode.getEditMode();
    console.log(this.editMode);
    console.log(this.recipeEditIndex);
    this.initForm();

  }

  get ingredient() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  initForm() {
    let recipeName = '';
    let recipeImageURL = '';
    let description = '';
    let ingredients = new FormArray([]);
    if (this.editMode) {
      let recipe = this.recipeService.getRecipeById(this.recipeEditIndex);
      console.log(recipe);

      recipeName = recipe.name;
      description = recipe.description;
      recipeImageURL = recipe.imagePath;
      if (recipe.ingredients) {
        for (const iterator of recipe.ingredients) {
          ingredients.push(new FormGroup({
            'name': new FormControl(iterator.name, [Validators.required]),
            'amount': new FormControl(iterator.amount, [Validators.required])
          }))
        }
      }

    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'imageURL': new FormControl(recipeImageURL, [Validators.required]),
      'description': new FormControl(description, [Validators.required]),
      'ingredients': ingredients
    })
  }

  addIngredient() {
    this.ingredient.push(new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'amount': new FormControl('', [Validators.required])
    }))
  }

  clearForm() {
    this.recipeForm.reset();
    this.router.navigateByUrl('/recipe');

  }

  onSubmit() {
    console.log(this.recipeForm.value);

    if (this.editMode) {
      this.recipeService.updateRecipeById(this.recipeEditIndex, this.recipeForm.value)
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigateByUrl('/recipe');

  }

  deleteIngredient(index: number) {
    this.ingredient.removeAt(index);
  }

}
