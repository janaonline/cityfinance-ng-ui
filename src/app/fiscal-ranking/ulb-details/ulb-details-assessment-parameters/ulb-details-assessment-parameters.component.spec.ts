import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UlbDetailsAssessmentParametersComponent } from './ulb-details-assessment-parameters.component';

describe('UlbDetailsAssessmentParametersComponent', () => {
  let component: UlbDetailsAssessmentParametersComponent;
  let fixture: ComponentFixture<UlbDetailsAssessmentParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UlbDetailsAssessmentParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UlbDetailsAssessmentParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
