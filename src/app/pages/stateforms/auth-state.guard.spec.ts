import { TestBed } from '@angular/core/testing';

import { AuthStateGuard } from './auth-state.guard';

describe('AuthStateGuard', () => {
  let guard: AuthStateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthStateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
