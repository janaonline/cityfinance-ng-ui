import { TestBed } from '@angular/core/testing';

import { GAservicesService } from './g-aservices.service';

describe('GAservicesService', () => {
  let service: GAservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GAservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
