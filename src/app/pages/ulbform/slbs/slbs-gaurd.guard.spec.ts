import { TestBed } from '@angular/core/testing';

import { SlbsGaurdGuard } from './slbs-gaurd.guard';

describe('SlbsGaurdGuard', () => {
  let guard: SlbsGaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SlbsGaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
