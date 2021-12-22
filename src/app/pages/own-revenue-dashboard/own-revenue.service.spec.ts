import { TestBed } from '@angular/core/testing';

import { OwnRevenueService } from './own-revenue.service';

describe('OwnRevenueService', () => {
  let service: OwnRevenueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnRevenueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
