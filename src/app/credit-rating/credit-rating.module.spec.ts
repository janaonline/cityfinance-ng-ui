import { CreditRatingModule } from './credit-rating.module';

describe('CreditRatingModule', () => {
  let creditRatingModule: CreditRatingModule;

  beforeEach(() => {
    creditRatingModule = new CreditRatingModule();
  });

  it('should create an instance', () => {
    expect(creditRatingModule).toBeTruthy();
  });
});
