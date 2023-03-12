import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
})
export class DropzoneComponent {
  @Output()
  uploadFile: EventEmitter<File[]> = new EventEmitter<File[]>();

  dragover = false;

  fileDropped($event: Event | DragEvent): void {
    const files =
      $event instanceof DragEvent
        ? Array.from($event.dataTransfer?.files || [])
        : Array.from(($event.target as HTMLInputElement).files || []);

    if (!files.length) {
      return;
    }

    this.uploadFile.emit(files);
  }

  @HostListener('dragover', ['$event'])
  dragOver(event: Event): void {
    event.preventDefault();

    this.dragover = true;
  }

  @HostListener('dragleave', ['$event'])
  dragLeave(event: Event): void {
    event.preventDefault();

    this.dragover = false;
  }

  @HostListener('drop', ['$event'])
  drop(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.fileDropped(event);

    this.dragover = false;
  }
}
