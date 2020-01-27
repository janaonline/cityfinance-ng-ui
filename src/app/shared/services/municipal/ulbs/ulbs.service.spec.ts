import { TestBed } from '@angular/core/testing';

import { UlbsService } from './ulbs.service';

describe('UlbsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UlbsService = TestBed.get(UlbsService);
    expect(service).toBeTruthy();
  });
});
