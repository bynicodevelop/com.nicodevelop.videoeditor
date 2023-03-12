import { DomSanitizer } from '@angular/platform-browser';

import { SafeurlPipe } from './safeurl.pipe';

describe('SafeurlPipe', () => {
  it('create an instance', () => {
    const pipe = new SafeurlPipe(
      {} as DomSanitizer // DomSanitizer
    );
    expect(pipe).toBeTruthy();
  });
});
