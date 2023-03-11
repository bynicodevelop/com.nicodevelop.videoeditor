import { getFileNameFromFile } from './string';

describe('getFileNameFromFile', () => {
  it('should remove the extension from a filename', () => {
    const filename = 'video.mp4';
    const expected = 'video';
    const result = getFileNameFromFile(filename);
    expect(result).toEqual(expected);
  });

  it('should not remove anything from a filename without an extension', () => {
    const filename = 'video';
    const expected = 'video';
    const result = getFileNameFromFile(filename);
    expect(result).toEqual(expected);
  });

  it('should remove only the last extension from a filename with multiple extensions', () => {
    const filename = 'video.test.mp4';
    const expected = 'video.test';
    const result = getFileNameFromFile(filename);
    expect(result).toEqual(expected);
  });
});
