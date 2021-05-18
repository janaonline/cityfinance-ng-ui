import { TestBed } from '@angular/core/testing';

import { UlbAdminService } from './ulb-admin.service';

describe('UlbAdminService', () => {
  let service: UlbAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UlbAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
