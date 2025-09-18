import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateDashboardDalgoComponent } from './state-dashboard-dalgo.component';

describe('StateDashboardDalgoComponent', () => {
  let component: StateDashboardDalgoComponent;
  let fixture: ComponentFixture<StateDashboardDalgoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateDashboardDalgoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateDashboardDalgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
