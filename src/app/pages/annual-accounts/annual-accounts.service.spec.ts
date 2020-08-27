import { TestBed } from '@angular/core/testing';

import { AnnualAccountsService } from './annual-accounts.service';

describe('AnnualAccountsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnualAccountsService = TestBed.get(AnnualAccountsService);
    expect(service).toBeTruthy();
  });
});
