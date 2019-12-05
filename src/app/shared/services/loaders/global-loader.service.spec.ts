import { TestBed } from '@angular/core/testing';

import { GlobalLoaderService } from './global-loader.service';

describe('GlobalLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalLoaderService = TestBed.get(GlobalLoaderService);
    expect(service).toBeTruthy();
  });
});
