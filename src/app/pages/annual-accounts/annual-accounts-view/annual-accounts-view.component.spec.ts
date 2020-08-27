import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualAccountsViewComponent } from './annual-accounts-view.component';

describe('AnnualAccountsViewComponent', () => {
  let component: AnnualAccountsViewComponent;
  let fixture: ComponentFixture<AnnualAccountsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnualAccountsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualAccountsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
