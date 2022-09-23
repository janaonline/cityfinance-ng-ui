import { TestBed } from '@angular/core/testing';

import { Ulb2223Guard } from './ulb2223.guard';

describe('Ulb2223Guard', () => {
  let guard: Ulb2223Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Ulb2223Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
