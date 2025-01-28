import { TestBed } from '@angular/core/testing';

import { DownloadUserInfoService } from './download-user-info.service';

describe('DownloadUserInfoService', () => {
  let service: DownloadUserInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadUserInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
