import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentParameterComponent } from './assessment-parameter.component';

describe('AssessmentParameterComponent', () => {
  let component: AssessmentParameterComponent;
  let fixture: ComponentFixture<AssessmentParameterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentParameterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentParameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
