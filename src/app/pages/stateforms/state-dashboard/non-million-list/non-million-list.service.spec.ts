import { TestBed } from '@angular/core/testing';

import { NonMillionListService } from './non-million-list.service';

describe('NonMillionListService', () => {
  let service: NonMillionListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonMillionListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
