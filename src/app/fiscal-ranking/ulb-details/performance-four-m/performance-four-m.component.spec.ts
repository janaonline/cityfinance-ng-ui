import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceFourMComponent } from './performance-four-m.component';

describe('PerformanceFourMComponent', () => {
  let component: PerformanceFourMComponent;
  let fixture: ComponentFixture<PerformanceFourMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerformanceFourMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformanceFourMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
