import { NgIf } from '@angular/common';
import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../models/file-handle';

@Directive({
  selector: '[appImageDrag]',
})
export class ImageDragDirective {
  @Output('files') files: EventEmitter<FileHandle[]> = new EventEmitter();
  @HostBinding('style.background') public background!: string;
  constructor(private sanitizer: DomSanitizer) {}
  @HostListener('dragover', ['$event'])
  public onDragOver(dragEvent: DragEvent) {
    console.log(dragEvent);
    dragEvent.preventDefault();
    dragEvent.stopPropagation();
    this.background = '#999';
  }
  @HostListener('dragleave', ['$event'])
  public onDragLeave(dragEvent: DragEvent) {
    console.log(dragEvent);
    dragEvent.preventDefault();
    dragEvent.stopPropagation();
    this.background = '#eee';
  }
  @HostListener('drop', ['$event'])
  public onDrop(dragEvent: DragEvent) {
    dragEvent.preventDefault();
    dragEvent.stopPropagation();
    this.background = '#eee';
    let files: FileHandle[] = [];
    if (dragEvent.dataTransfer) {
      console.log(dragEvent.dataTransfer);
      for (let i = 0; i < dragEvent.dataTransfer.files.length; i++) {
        const file = dragEvent.dataTransfer.files[i];
        console.log(file.name);
        /*bypassSecurityTrustUrl(): WARNING: calling this method with untrusted user data exposes your application to XSS security risks! */
        /* in order to show their preview, we are using DomSantizer to obtain their URL to show in img tags. */
        const url = this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        );
        console.log(
          ' window.URL.createObjectURL(file):' +
            window.URL.createObjectURL(file)
        );
        files.push({
          file,
          url,
        });
      }
      if (files.length > 0) {
        console.log('emit');
        this.files.emit(files);
      }
    }
  }
}
