import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualAccountsComponent } from './annual-accounts.component';

describe('AnnualAccountsComponent', () => {
  let component: AnnualAccountsComponent;
  let fixture: ComponentFixture<AnnualAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
