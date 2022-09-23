import { TestBed } from '@angular/core/testing';

import { State2223Guard } from './state2223.guard';

describe('State2223Guard', () => {
  let guard: State2223Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(State2223Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
