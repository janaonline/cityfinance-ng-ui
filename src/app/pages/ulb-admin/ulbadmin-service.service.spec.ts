import { TestBed } from '@angular/core/testing';

import { UlbadminServiceService } from './ulbadmin-service.service';

describe('UlbadminServiceService', () => {
  let service: UlbadminServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UlbadminServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
