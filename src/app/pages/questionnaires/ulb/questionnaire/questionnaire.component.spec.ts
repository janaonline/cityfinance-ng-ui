import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ULBQuestionnaireComponent } from './questionnaire.component';

describe("QuestionnaireComponent", () => {
  let component: ULBQuestionnaireComponent;
  let fixture: ComponentFixture<ULBQuestionnaireComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ULBQuestionnaireComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ULBQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
