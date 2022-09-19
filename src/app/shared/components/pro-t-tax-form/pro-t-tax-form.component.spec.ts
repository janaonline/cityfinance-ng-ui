import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProTTaxFormComponent } from './pro-t-tax-form.component';

describe('ProTTaxFormComponent', () => {
  let component: ProTTaxFormComponent;
  let fixture: ComponentFixture<ProTTaxFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProTTaxFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProTTaxFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
