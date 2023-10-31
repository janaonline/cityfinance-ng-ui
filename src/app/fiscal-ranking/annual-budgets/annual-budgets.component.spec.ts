import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualBudgetsComponent } from './annual-budgets.component';

describe('AnnualBudgetsComponent', () => {
  let component: AnnualBudgetsComponent;
  let fixture: ComponentFixture<AnnualBudgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualBudgetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualBudgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
