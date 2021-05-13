import { TestBed } from '@angular/core/testing';

import { UlbformService } from './ulbform.service';

describe('UlbformService', () => {
  let service: UlbformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UlbformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
