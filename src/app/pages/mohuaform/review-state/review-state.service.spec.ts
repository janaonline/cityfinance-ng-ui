import { TestBed } from '@angular/core/testing';

import { ReviewStateService } from './review-state.service';

describe('ReviewStateService', () => {
  let service: ReviewStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
