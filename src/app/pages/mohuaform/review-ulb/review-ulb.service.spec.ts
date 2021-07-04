import { TestBed } from '@angular/core/testing';

import { ReviewUlbService } from './review-ulb.service';

describe('ReviewUlbService', () => {
  let service: ReviewUlbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewUlbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
