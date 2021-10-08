import { TestBed } from '@angular/core/testing';

import { MpfcListService } from './mpfc-list.service';

describe('MpfcListService', () => {
  let service: MpfcListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MpfcListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
