import { TestBed } from '@angular/core/testing';

import { AnnualAccountsService } from './annual-accounts.service';

describe('AnnualAccountsService', () => {
  let service: AnnualAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnualAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
