import { TestBed } from '@angular/core/testing';

import { FiscalRankingService } from './fiscal-ranking.service';

describe('FiscalRankingService', () => {
  let service: FiscalRankingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiscalRankingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
