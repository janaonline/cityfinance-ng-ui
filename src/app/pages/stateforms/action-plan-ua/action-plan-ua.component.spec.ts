import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionPlanUAComponent } from './action-plan-ua.component';

describe('ActionPlanUAComponent', () => {
  let component: ActionPlanUAComponent;
  let fixture: ComponentFixture<ActionPlanUAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionPlanUAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionPlanUAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
