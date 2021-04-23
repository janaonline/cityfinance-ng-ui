import { UlbNotRegisteredModule } from './ulb-not-registered.module';

describe('UlbNotRegisteredModule', () => {
  let ulbNotRegisteredModule: UlbNotRegisteredModule;

  beforeEach(() => {
    ulbNotRegisteredModule = new UlbNotRegisteredModule();
  });

  it('should create an instance', () => {
    expect(ulbNotRegisteredModule).toBeTruthy();
  });
});
