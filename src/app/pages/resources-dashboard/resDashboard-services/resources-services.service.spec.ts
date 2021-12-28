import { TestBed } from '@angular/core/testing';

import { ResourcesServicesService } from './resources-services.service';

describe('ResourcesServicesService', () => {
  let service: ResourcesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourcesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
