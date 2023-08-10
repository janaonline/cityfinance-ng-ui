import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingHistoryTableComponent } from './tracking-history-table.component';

describe('TrackingHistoryTableComponent', () => {
  let component: TrackingHistoryTableComponent;
  let fixture: ComponentFixture<TrackingHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingHistoryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
