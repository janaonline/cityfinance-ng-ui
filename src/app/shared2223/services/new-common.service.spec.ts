import { TestBed } from '@angular/core/testing';

import { NewCommonService } from './new-common.service';

describe('NewCommonService', () => {
  let service: NewCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
