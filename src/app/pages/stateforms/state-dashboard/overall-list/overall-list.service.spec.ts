import { TestBed } from '@angular/core/testing';

import { OverallListService } from './overall-list.service';

describe('OverallListService', () => {
  let service: OverallListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverallListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
