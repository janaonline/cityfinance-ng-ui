import { TestBed } from '@angular/core/testing';

import { AccountReactivateService } from './account-reactivate.service';

describe('AccountReactivateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountReactivateService = TestBed.get(AccountReactivateService);
    expect(service).toBeTruthy();
  });
});
