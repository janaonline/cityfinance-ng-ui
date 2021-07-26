import { TestBed } from '@angular/core/testing';

import { GtMohuaService } from './gt-mohua.service';

describe('GtMohuaService', () => {
  let service: GtMohuaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GtMohuaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
