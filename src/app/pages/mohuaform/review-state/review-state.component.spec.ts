import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewStateComponent } from './review-state.component';

describe('ReviewStateComponent', () => {
  let component: ReviewStateComponent;
  let fixture: ComponentFixture<ReviewStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
