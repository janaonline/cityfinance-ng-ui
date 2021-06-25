import { TestBed } from '@angular/core/testing';

import { SlbListService } from './slb-list.service';

describe('SlbListService', () => {
  let service: SlbListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlbListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
