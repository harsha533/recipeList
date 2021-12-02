import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Ingredient } from '../../model/ingredient';
import { ShoppingService } from '../../services/shopping-service/shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  ingredientForms: FormGroup;
  index: number;
  editIngredient: Ingredient;
  editMode: boolean = false;

  get name() {
    return this.ingredientForms.get('name');
  }

  get amount() {
    return this.ingredientForms.get('amount');
  }
  constructor(private _fb: FormBuilder, private _slService: ShoppingService) { }

  ngOnInit(): void {
    this._slService.ingredientEditIndex$.subscribe((data) => {
      this.editIngredient = this._slService.getIngredientData(data);
      this.ingredientForms.patchValue({
        'name': this.editIngredient.name,
        'amount': this.editIngredient.amount
      })
      this.editMode = true;
      this.index = data;
    })
    this.createIngredientForm();
  }


  createIngredientForm() {
    this.ingredientForms = this._fb.group({
      'name': ['', Validators.required],
      'amount': ['', Validators.required]
    })
  }

  addShoppingList() {
    const INGREDIENT_NAME = this.name.value;
    const INGREDIENT_AMOUNT = this.amount.value;

    if (this.editMode) {
      const INGREDIENT: Ingredient = { name: INGREDIENT_NAME, amount: INGREDIENT_AMOUNT }
      this._slService.updateEditIngredient(this.index, INGREDIENT);
    }
    else {
      this._slService.addShoppingIngredient(new Ingredient(INGREDIENT_NAME, INGREDIENT_AMOUNT));
    }
    this.editMode = false;
    this.ingredientForms.reset();

  }

  clearForm() {
    this.editMode = false;
    this.ingredientForms.reset();
  }

  deleteIngredient() {
    this._slService.deleteIngredient(this.index);
    this.clearForm();
  }
}
