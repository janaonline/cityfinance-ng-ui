import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTaxFloorRateComponent } from './property-tax-floor-rate.component';

describe('PropertyTaxFloorRateComponent', () => {
  let component: PropertyTaxFloorRateComponent;
  let fixture: ComponentFixture<PropertyTaxFloorRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyTaxFloorRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyTaxFloorRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
