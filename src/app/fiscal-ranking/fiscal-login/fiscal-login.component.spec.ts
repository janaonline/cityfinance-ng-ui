import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiscalLoginComponent } from './fiscal-login.component';

describe('FiscalLoginComponent', () => {
  let component: FiscalLoginComponent;
  let fixture: ComponentFixture<FiscalLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiscalLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiscalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
