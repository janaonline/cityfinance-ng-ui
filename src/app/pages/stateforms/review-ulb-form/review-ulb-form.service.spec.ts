import { TestBed } from '@angular/core/testing';

import { ReviewUlbFormService } from './review-ulb-form.service';

describe('ReviewUlbFormService', () => {
  let service: ReviewUlbFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewUlbFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
