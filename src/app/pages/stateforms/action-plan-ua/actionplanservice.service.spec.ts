import { TestBed } from '@angular/core/testing';

import { ActionplanserviceService } from './actionplanservice.service';

describe('ActionplanserviceService', () => {
  let service: ActionplanserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionplanserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
