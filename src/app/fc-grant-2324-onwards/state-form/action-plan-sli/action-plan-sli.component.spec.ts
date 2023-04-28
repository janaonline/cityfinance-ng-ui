import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanSliComponent } from './action-plan-sli.component';

describe('ActionPlanSliComponent', () => {
  let component: ActionPlanSliComponent;
  let fixture: ComponentFixture<ActionPlanSliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionPlanSliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPlanSliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
