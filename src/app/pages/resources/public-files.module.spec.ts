import { PublicFilesModule } from './public-files.module';

describe('PublicFilesModule', () => {
  let publicFilesModule: PublicFilesModule;

  beforeEach(() => {
    publicFilesModule = new PublicFilesModule();
  });

  it('should create an instance', () => {
    expect(publicFilesModule).toBeTruthy();
  });
});
