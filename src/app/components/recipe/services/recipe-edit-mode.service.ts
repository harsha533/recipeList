import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecipeEditModeService {

  constructor() { }
  editMode: boolean = false;

  setEditMode(mode: boolean) {
    this.editMode = mode;
  }

  getEditMode() {
   return this.editMode;
  }
}
