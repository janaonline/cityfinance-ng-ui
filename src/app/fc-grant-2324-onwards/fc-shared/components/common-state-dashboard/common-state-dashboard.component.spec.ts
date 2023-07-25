import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonStateDashboardComponent } from './common-state-dashboard.component';

describe('CommonStateDashboardComponent', () => {
  let component: CommonStateDashboardComponent;
  let fixture: ComponentFixture<CommonStateDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonStateDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonStateDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
