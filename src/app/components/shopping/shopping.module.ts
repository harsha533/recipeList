import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ShoppingRoutingModule } from "./shopping-routing.module";
import { ShoppingEditComponent } from "./shopping-list/shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";


@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  exports: [ShoppingListComponent, ShoppingEditComponent],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ShoppingModule {}
