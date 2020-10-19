import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialUploadsComponent } from './financial-uploads.component';

describe('FinancialUploadsComponent', () => {
  let component: FinancialUploadsComponent;
  let fixture: ComponentFixture<FinancialUploadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialUploadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
