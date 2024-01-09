import { ToStorageUrlPipe } from './to-storage-url.pipe';

describe('ToStorageUrlPipe', () => {
  it('create an instance', () => {
    const pipe = new ToStorageUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
