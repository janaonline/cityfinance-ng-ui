import { TestBed } from '@angular/core/testing';

import { NewDashboardService } from './new-dashboard.service';

describe('NewDashboardService', () => {
  let service: NewDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
