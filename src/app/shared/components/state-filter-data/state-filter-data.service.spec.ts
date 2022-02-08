import { TestBed } from '@angular/core/testing';

import { StateFilterDataService } from './state-filter-data.service';

describe('StateFilterDataService', () => {
  let service: StateFilterDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateFilterDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
