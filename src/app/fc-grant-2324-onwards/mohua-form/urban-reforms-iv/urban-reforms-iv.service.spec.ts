import { TestBed } from '@angular/core/testing';

import { UrbanReformsIvService } from './urban-reforms-iv.service';

describe('UrbanReformsIvService', () => {
  let service: UrbanReformsIvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrbanReformsIvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
