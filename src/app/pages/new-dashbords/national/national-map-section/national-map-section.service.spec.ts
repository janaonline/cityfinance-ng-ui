import { TestBed } from '@angular/core/testing';

import { NationalMapSectionService } from './national-map-section.service';

describe('NationalMapSectionService', () => {
  let service: NationalMapSectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NationalMapSectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
