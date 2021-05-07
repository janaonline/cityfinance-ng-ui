import { TestBed } from '@angular/core/testing';

import { UlbGaurdGuard } from './ulb-gaurd.guard';

describe('UlbGaurdGuard', () => {
  let guard: UlbGaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UlbGaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
