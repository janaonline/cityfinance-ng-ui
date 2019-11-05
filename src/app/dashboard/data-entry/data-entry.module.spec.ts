import { DataEntryModule } from './data-entry.module';

describe('DataEntryModule', () => {
  let dataEntryModule: DataEntryModule;

  beforeEach(() => {
    dataEntryModule = new DataEntryModule();
  });

  it('should create an instance', () => {
    expect(dataEntryModule).toBeTruthy();
  });
});
