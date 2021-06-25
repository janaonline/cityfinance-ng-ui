import { TestBed } from '@angular/core/testing';

import { PfmsListService } from './pfms-list.service';

describe('PfmsListService', () => {
  let service: PfmsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PfmsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
