import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckScorePerformanceComponent } from './check-score-performance.component';

describe('CheckScorePerformanceComponent', () => {
  let component: CheckScorePerformanceComponent;
  let fixture: ComponentFixture<CheckScorePerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckScorePerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckScorePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
