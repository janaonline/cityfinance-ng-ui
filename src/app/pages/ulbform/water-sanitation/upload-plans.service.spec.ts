import { TestBed } from '@angular/core/testing';

import { UploadPlansService } from './upload-plans.service';

describe('UploadPlansService', () => {
  let service: UploadPlansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadPlansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
