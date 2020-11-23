import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountReactivateComponent } from './account-reactivate.component';

describe('AccountReactivateComponent', () => {
  let component: AccountReactivateComponent;
  let fixture: ComponentFixture<AccountReactivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountReactivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountReactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
