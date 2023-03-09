import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeurl',
})
export class SafeurlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: File): string {
    return this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(value)
    ) as string;
  }
}
