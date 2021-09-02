import { TestBed } from '@angular/core/testing';

import { UtilreportListService } from './utilreport-list.service';

describe('UtilreportListService', () => {
  let service: UtilreportListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilreportListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
