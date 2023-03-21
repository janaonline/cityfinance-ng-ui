import { TestBed } from '@angular/core/testing';

import { DurService } from './dur.service';

describe('DurService', () => {
  let service: DurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
