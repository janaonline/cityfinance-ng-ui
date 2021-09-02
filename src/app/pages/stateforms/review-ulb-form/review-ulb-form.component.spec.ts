import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewUlbFormComponent } from './review-ulb-form.component';

describe('ReviewUlbFormComponent', () => {
  let component: ReviewUlbFormComponent;
  let fixture: ComponentFixture<ReviewUlbFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewUlbFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewUlbFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
