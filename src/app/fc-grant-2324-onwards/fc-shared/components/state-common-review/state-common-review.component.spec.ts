import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateCommonReviewComponent } from './state-common-review.component';

describe('StateCommonReviewComponent', () => {
  let component: StateCommonReviewComponent;
  let fixture: ComponentFixture<StateCommonReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateCommonReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateCommonReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
