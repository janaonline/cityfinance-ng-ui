import { TestBed } from '@angular/core/testing';

import { AnnualaccListService } from './annualacc-list.service';

describe('AnnualaccListService', () => {
  let service: AnnualaccListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnualaccListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
