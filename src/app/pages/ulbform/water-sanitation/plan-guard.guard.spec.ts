import { TestBed } from '@angular/core/testing';

import { PlanGuardGuard } from './plan-guard.guard';

describe('PlanGuardGuard', () => {
  let guard: PlanGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PlanGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
