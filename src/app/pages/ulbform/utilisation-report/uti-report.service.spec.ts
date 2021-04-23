import { TestBed } from '@angular/core/testing';

import { UtiReportService } from './uti-report.service';

describe('UtiReportService', () => {
  let service: UtiReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtiReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
