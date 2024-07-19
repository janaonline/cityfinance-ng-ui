import { TestBed } from '@angular/core/testing';

import { RevenuechartService } from './revenuechart.service';

describe('RevenuechartService', () => {
  let service: RevenuechartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevenuechartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
