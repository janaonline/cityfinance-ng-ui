import { TestBed } from '@angular/core/testing';

import { PlansListService } from './plans-list.service';

describe('PlansListService', () => {
  let service: PlansListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlansListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
