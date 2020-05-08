import { UlbsModule } from './ulbs.module';

describe('UlbsModule', () => {
  let ulbsModule: UlbsModule;

  beforeEach(() => {
    ulbsModule = new UlbsModule();
  });

  it('should create an instance', () => {
    expect(ulbsModule).toBeTruthy();
  });
});
