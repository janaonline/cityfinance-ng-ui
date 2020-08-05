import { AccountReactivateModule } from './account-reactivate.module';

describe('AccountReactivateModule', () => {
  let accountReactivateModule: AccountReactivateModule;

  beforeEach(() => {
    accountReactivateModule = new AccountReactivateModule();
  });

  it('should create an instance', () => {
    expect(accountReactivateModule).toBeTruthy();
  });
});
