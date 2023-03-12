export const getFileNameFromFile = (filename: string): string =>
  filename.replace(/\.[^/.]+$/, '');
