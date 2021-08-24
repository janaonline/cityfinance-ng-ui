import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewUlbComponent } from './review-ulb.component';

describe('ReviewUlbComponent', () => {
  let component: ReviewUlbComponent;
  let fixture: ComponentFixture<ReviewUlbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewUlbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewUlbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
