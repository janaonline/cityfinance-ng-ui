import { TestBed } from '@angular/core/testing';

import { MunicipalityBudgetService } from './municipality-budget.service';

describe('MunicipalityBudgetService', () => {
  let service: MunicipalityBudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MunicipalityBudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
