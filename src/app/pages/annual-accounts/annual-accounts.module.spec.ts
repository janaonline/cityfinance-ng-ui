import { AnnualAccountsModule } from './annual-accounts.module';

describe('AnnualAccountsModule', () => {
  let annualAccountsModule: AnnualAccountsModule;

  beforeEach(() => {
    annualAccountsModule = new AnnualAccountsModule();
  });

  it('should create an instance', () => {
    expect(annualAccountsModule).toBeTruthy();
  });
});
