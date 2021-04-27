import { TestBed } from '@angular/core/testing';

import { WaterSanitationService } from './water-sanitation.service';

describe('WaterSanitationService', () => {
  let service: WaterSanitationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterSanitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
