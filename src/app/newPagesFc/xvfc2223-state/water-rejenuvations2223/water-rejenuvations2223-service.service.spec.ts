import { TestBed } from '@angular/core/testing';

import { WaterRejenuvations2223ServiceService } from './water-rejenuvations2223-service.service';

describe('WaterRejenuvations2223ServiceService', () => {
  let service: WaterRejenuvations2223ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterRejenuvations2223ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
