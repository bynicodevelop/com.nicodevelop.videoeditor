import { SafeurlPipe } from './safeurl.pipe';

describe('SafeurlPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeurlPipe(
      {} as any // DomSanitizer
    );
    expect(pipe).toBeTruthy();
  });
});
