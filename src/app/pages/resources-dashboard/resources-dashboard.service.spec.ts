import { TestBed } from '@angular/core/testing';

import { ResourcesDashboardService } from './resources-dashboard.service';

describe('ResourcesDashboardService', () => {
  let service: ResourcesDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourcesDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
