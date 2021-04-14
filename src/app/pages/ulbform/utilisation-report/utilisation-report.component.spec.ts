import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisationReportComponent } from './utilisation-report.component';

describe('UtilisationReportComponent', () => {
  let component: UtilisationReportComponent;
  let fixture: ComponentFixture<UtilisationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilisationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
