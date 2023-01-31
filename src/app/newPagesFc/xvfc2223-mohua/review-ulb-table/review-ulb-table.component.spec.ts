import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewUlbTableComponent } from './review-ulb-table.component';

describe('ReviewUlbTableComponent', () => {
  let component: ReviewUlbTableComponent;
  let fixture: ComponentFixture<ReviewUlbTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewUlbTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewUlbTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
