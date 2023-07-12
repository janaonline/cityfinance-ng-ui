import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipalityBudgetComponent } from './municipality-budget.component';

describe('MunicipalityBudgetComponent', () => {
  let component: MunicipalityBudgetComponent;
  let fixture: ComponentFixture<MunicipalityBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunicipalityBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipalityBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
