import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedUtilizationReportComponent } from './detailed-utilization-report.component';

describe('DetailedUtilizationReportComponent', () => {
  let component: DetailedUtilizationReportComponent;
  let fixture: ComponentFixture<DetailedUtilizationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedUtilizationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedUtilizationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
