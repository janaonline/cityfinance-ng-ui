import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCityCreditRatingComponent } from './new-city-credit-rating.component';

describe('NewCityCreditRatingComponent', () => {
  let component: NewCityCreditRatingComponent;
  let fixture: ComponentFixture<NewCityCreditRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCityCreditRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCityCreditRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
