import { TestBed } from '@angular/core/testing';

import { StateResourceService } from './state-resource.service';

describe('StateResourceService', () => {
  let service: StateResourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateResourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
