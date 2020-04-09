import { StateListModule } from './state-list.module';

describe('StateListModule', () => {
  let stateListModule: StateListModule;

  beforeEach(() => {
    stateListModule = new StateListModule();
  });

  it('should create an instance', () => {
    expect(stateListModule).toBeTruthy();
  });
});
