import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualFinancialStatementsComponent } from './annual-financial-statements.component';

describe('AnnualFinancialStatementsComponent', () => {
  let component: AnnualFinancialStatementsComponent;
  let fixture: ComponentFixture<AnnualFinancialStatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualFinancialStatementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualFinancialStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
