import { TestBed } from '@angular/core/testing';

import { UlbGaurdsGuard } from './ulb-gaurds.guard';

describe('UlbGaurdsGuard', () => {
  let guard: UlbGaurdsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UlbGaurdsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
