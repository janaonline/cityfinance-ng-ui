import { TestBed } from '@angular/core/testing';

import { BalanceTableService } from './balance-table.service';

describe('BalanceTableService', () => {
  let service: BalanceTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BalanceTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
