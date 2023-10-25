import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentParametersComponent } from './assessment-parameters.component';

describe('AssessmentParametersComponent', () => {
  let component: AssessmentParametersComponent;
  let fixture: ComponentFixture<AssessmentParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
