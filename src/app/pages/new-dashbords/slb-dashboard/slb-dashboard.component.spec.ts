import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlbDashboardComponent } from './slb-dashboard.component';

describe('SlbDashboardComponent', () => {
  let component: SlbDashboardComponent;
  let fixture: ComponentFixture<SlbDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlbDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlbDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
