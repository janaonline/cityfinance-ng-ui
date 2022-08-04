import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTaxFloorRatePreviewComponent } from './property-tax-floor-rate-preview.component';

describe('PropertyTaxFloorRatePreviewComponent', () => {
  let component: PropertyTaxFloorRatePreviewComponent;
  let fixture: ComponentFixture<PropertyTaxFloorRatePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyTaxFloorRatePreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyTaxFloorRatePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
