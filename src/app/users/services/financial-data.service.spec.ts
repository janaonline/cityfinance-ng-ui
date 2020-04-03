import { TestBed } from '@angular/core/testing';

import { FinancialDataService } from './financial-data.service';

describe('FinancialDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinancialDataService = TestBed.get(FinancialDataService);
    expect(service).toBeTruthy();
  });
});
