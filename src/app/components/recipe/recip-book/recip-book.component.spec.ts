import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipBookComponent } from './recip-book.component';

describe('RecipBookComponent', () => {
  let component: RecipBookComponent;
  let fixture: ComponentFixture<RecipBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
