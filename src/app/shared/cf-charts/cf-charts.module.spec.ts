import { CfChartsModule } from './cf-charts.module';

describe('CfChartsModule', () => {
  let cfChartsModule: CfChartsModule;

  beforeEach(() => {
    cfChartsModule = new CfChartsModule();
  });

  it('should create an instance', () => {
    expect(cfChartsModule).toBeTruthy();
  });
});
