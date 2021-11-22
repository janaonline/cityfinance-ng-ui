import { TestBed } from '@angular/core/testing';

import { GrantClaimsService } from './grant-claims.service';

describe('GrantClaimsService', () => {
  let service: GrantClaimsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrantClaimsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
