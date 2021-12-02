import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../model/ingredient';
import { ShoppingService } from '../services/shopping-service/shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredients: Ingredient[] = [];
  displayedColumns: string[] = ['name', 'amount'];
  private subscription: Subscription
  constructor(private slService: ShoppingService) { }
 

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredientsList();
    this.subscription = this.slService.ingredientsObservable$.subscribe((data) => {
      //console.log(data);
      this.ingredients = data;
      console.log(this.ingredients);
      
    })
  }

  onEditListItem(index) {
    console.log(index);
    
    this.slService.ingredientEditIndex$.next(index);

  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

}
