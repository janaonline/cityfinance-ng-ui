import { TestBed } from '@angular/core/testing';

import { PropertyTaxService } from './property-tax.service';

describe('PropertyTaxService', () => {
  let service: PropertyTaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyTaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
