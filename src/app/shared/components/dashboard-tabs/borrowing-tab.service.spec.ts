import { TestBed } from '@angular/core/testing';

import { BorrowingTabService } from './borrowing-tab.service';

describe('BorrowingTabService', () => {
  let service: BorrowingTabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrowingTabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
