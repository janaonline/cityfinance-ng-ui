import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewStateFormComponent } from './review-state-form.component';

describe('ReviewStateFormComponent', () => {
  let component: ReviewStateFormComponent;
  let fixture: ComponentFixture<ReviewStateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewStateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewStateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
