import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCreditRatingComponent } from './new-credit-rating.component';

describe('NewCreditRatingComponent', () => {
  let component: NewCreditRatingComponent;
  let fixture: ComponentFixture<NewCreditRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCreditRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCreditRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
