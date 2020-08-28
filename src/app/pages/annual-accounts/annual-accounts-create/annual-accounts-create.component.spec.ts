import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualAccountsCreateComponent } from './annual-accounts-create.component';

describe('AnnualAccountsCreateComponent', () => {
  let component: AnnualAccountsCreateComponent;
  let fixture: ComponentFixture<AnnualAccountsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualAccountsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualAccountsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
