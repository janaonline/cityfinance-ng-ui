import { TestBed } from '@angular/core/testing';

import { MohuaDashboardService } from './mohua-dashboard.service';

describe('MohuaDashboardService', () => {
  let service: MohuaDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MohuaDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
