import { TestBed } from '@angular/core/testing';

import { WaterRejenuvationService } from './water-rejenuvation.service';

describe('WaterRejenuvationService', () => {
  let service: WaterRejenuvationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterRejenuvationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
