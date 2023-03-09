import * as md5 from 'md5';

export function uidFromFile(file: File): string {
  return md5(file.name + file.size + file.lastModified);
}
