import { TestBed } from '@angular/core/testing';

import { StateDashboardService } from './state-dashboard.service';

describe('StateDashboardService', () => {
  let service: StateDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
