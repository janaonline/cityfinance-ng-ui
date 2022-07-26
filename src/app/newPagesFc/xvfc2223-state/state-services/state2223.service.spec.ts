import { TestBed } from '@angular/core/testing';

import { State2223Service } from './state2223.service';

describe('State2223Service', () => {
  let service: State2223Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(State2223Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
