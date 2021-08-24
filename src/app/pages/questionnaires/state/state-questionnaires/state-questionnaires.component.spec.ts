import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StateQuestionnairesComponent } from './state-questionnaires.component';

describe('StateQuestionnairesComponent', () => {
  let component: StateQuestionnairesComponent;
  let fixture: ComponentFixture<StateQuestionnairesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StateQuestionnairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateQuestionnairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
