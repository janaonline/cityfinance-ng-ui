import { TestBed } from '@angular/core/testing';

import { SlbDashboardService } from './slb-dashboard.service';

describe('SlbDashboardService', () => {
  let service: SlbDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlbDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
