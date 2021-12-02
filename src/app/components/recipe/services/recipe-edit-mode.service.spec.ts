import { TestBed } from '@angular/core/testing';

import { RecipeEditModeService } from './recipe-edit-mode.service';

describe('RecipeEditModeService', () => {
  let service: RecipeEditModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeEditModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
