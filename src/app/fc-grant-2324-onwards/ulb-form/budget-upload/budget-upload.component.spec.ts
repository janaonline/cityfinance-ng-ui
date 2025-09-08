import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetUploadComponent } from './budget-upload.component';

describe('BudgetUploadComponent', () => {
  let component: BudgetUploadComponent;
  let fixture: ComponentFixture<BudgetUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
