import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTaxOperationalisationPreviewComponent } from './property-tax-operationalisation-preview.component';

describe('PropertyTaxOperationalisationPreviewComponent', () => {
  let component: PropertyTaxOperationalisationPreviewComponent;
  let fixture: ComponentFixture<PropertyTaxOperationalisationPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyTaxOperationalisationPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyTaxOperationalisationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
