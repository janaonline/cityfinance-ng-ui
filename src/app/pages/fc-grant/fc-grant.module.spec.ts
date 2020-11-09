import { FcGrantModule } from './fc-grant.module';

describe('FcGrantModule', () => {
  let fcGrantModule: FcGrantModule;

  beforeEach(() => {
    fcGrantModule = new FcGrantModule();
  });

  it('should create an instance', () => {
    expect(fcGrantModule).toBeTruthy();
  });
});
