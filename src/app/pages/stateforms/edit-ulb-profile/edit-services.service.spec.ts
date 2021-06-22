import { TestBed } from '@angular/core/testing';

import { EditServicesService } from './edit-services.service';

describe('EditServicesService', () => {
  let service: EditServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
