import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTaxOperationalisationComponent } from './property-tax-operationalisation.component';

describe('PropertyTaxOperationalisationComponent', () => {
  let component: PropertyTaxOperationalisationComponent;
  let fixture: ComponentFixture<PropertyTaxOperationalisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyTaxOperationalisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyTaxOperationalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
