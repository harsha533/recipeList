import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [],
  imports: [
    MatSliderModule,
    MatTableModule
  ],
  exports: [MatSliderModule
    , MatTableModule]
}
)
export class MaterialModule { }
