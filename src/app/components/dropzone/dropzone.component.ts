import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
})
export class DropzoneComponent {
  @Output()
  onUploadFile: EventEmitter<File[]> = new EventEmitter<File[]>();

  dragOver: boolean = false;

  onFileDropped($event: Event | DragEvent): void {
    const files =
      $event instanceof DragEvent
        ? Array.from($event.dataTransfer?.files || [])
        : Array.from(($event.target as HTMLInputElement).files || []);

    if (!files.length) {
      return;
    }

    this.onUploadFile.emit(files);
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: any): void {
    event.preventDefault();

    this.dragOver = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: any): void {
    event.preventDefault();

    this.dragOver = false;
  }

  @HostListener('drop', ['$event'])
  onDrop(event: any): void {
    event.preventDefault();
    event.stopPropagation();

    this.onFileDropped(event);

    this.dragOver = false;
  }
}
