import { SafeStyle, SafeUrl } from '@angular/platform-browser';

export interface FileHandle {
  file: File;
  url: SafeUrl;
  backgroundImageValue?: SafeStyle;
}
