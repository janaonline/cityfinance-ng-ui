import { TestBed } from '@angular/core/testing';

import { Mohua2223Guard } from './mohua2223.guard';

describe('Mohua2223Guard', () => {
  let guard: Mohua2223Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Mohua2223Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
