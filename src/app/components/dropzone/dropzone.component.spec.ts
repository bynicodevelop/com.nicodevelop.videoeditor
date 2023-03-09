import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropzoneComponent } from './dropzone.component';

describe('DropzoneComponent', () => {
  let component: DropzoneComponent;
  let fixture: ComponentFixture<DropzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropzoneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DropzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a dropzone', () => {
    const dropzone = fixture.nativeElement.querySelector('.dropzone');
    expect(dropzone).toBeTruthy();
  });

  it('La méthode onFileDropped() doit ajouter un fichier à la liste des fichiers', () => {
    const file = new File([''], 'test.txt', { type: 'text/plain' });

    const fileList = new DataTransfer();
    fileList.items.add(file);

    // Event
    const event = new DragEvent('drop', {
      dataTransfer: fileList,
    });

    component.onFileDropped(event);
    expect(component.files).toContain(file);
  });

  it('La méthode onFileDropped() doit ajouter plusieurs fichiers à la liste des fichiers', () => {
    const file1 = new File([''], 'test.txt', { type: 'text/plain' });
    const file2 = new File([''], 'test2.txt', { type: 'text/plain' });

    const fileList = new DataTransfer();
    fileList.items.add(file1);
    fileList.items.add(file2);

    // Event
    const event = new DragEvent('drop', {
      dataTransfer: fileList,
    });

    component.onFileDropped(event);
    expect(component.files).toContain(file1);
    expect(component.files).toContain(file2);
  });

  it('La méthode onFileDropped() doit ajouter un fichier avec type event (input de type file)', () => {
    const file = new File([''], 'test.txt', { type: 'text/plain' });

    const event = new Event('change');
    Object.defineProperty(event, 'target', {
      writable: false,
      value: { files: [file] },
    });

    component.onFileDropped(event);
    expect(component.files).toContain(file);
  });
});
