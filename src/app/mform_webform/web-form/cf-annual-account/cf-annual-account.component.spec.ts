import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfAnnualAccountComponent } from './cf-annual-account.component';

describe('CfAnnualAccountComponent', () => {
  let component: CfAnnualAccountComponent;
  let fixture: ComponentFixture<CfAnnualAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfAnnualAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfAnnualAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
