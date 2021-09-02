import { TestBed } from '@angular/core/testing';

import { AuthMohuaGuard } from './auth-mohua.guard';

describe('AuthMohuaGuard', () => {
  let guard: AuthMohuaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthMohuaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
