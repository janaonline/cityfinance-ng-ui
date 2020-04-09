import { DataUploadModule } from './data-upload.module';

describe('DataUploadModule', () => {
  let dataUploadModule: DataUploadModule;

  beforeEach(() => {
    dataUploadModule = new DataUploadModule();
  });

  it('should create an instance', () => {
    expect(dataUploadModule).toBeTruthy();
  });
});
