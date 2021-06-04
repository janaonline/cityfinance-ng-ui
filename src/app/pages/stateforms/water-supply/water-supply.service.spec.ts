import { TestBed } from '@angular/core/testing';

import { WaterSupplyService } from './water-supply.service';

describe('WaterSupplyService', () => {
  let service: WaterSupplyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterSupplyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
