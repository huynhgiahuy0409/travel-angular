import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/internal/Observable';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { FileHandle } from 'src/app/user/models/file-handle';
import { Event } from '@angular/router';
import { UploadFileService } from 'src/app/user/services/upload-file.service';
interface AudienceCustomer {
  icon: string;
  title: string;
  subTitle: string;
  type?: string;
}
interface Location {
  lat: number;
  lng: number;
  label: {
    name: string;
    subName: string;
  };
}
@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: [
    './create-post-dialog.component.scss',
    '../.././home.component.scss',
  ],
})
export class CreatePostDialogComponent implements OnInit {
  @ViewChild('photoInput', { static: false })
  photoInput!: ElementRef<HTMLInputElement>;
  showCreatePostContainer = true;
  preDialogTitle!: string;
  prePage!: 'create' | 'edit' | 'audience' | 'tag' | 'feeling' | 'location';
  selectedPage:
    | 'create'
    | 'edit'
    | 'audience'
    | 'tag'
    | 'feeling'
    | 'location' = 'create';
  feelings: { name: string; url: string }[] = [
    {
      name: 'happy',
      url: 'https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/8Ra5UUBdEoq.png',
    },
    {
      name: 'blessed',
      url: 'https://static.xx.fbcdn.net/rsrc.php/v3/yN/r/D3_aKxnF-Ua.png',
    },
    {
      name: 'loved',
      url: 'https://static.xx.fbcdn.net/rsrc.php/v3/ya/r/-hhJNn3C4Sq.png',
    },
    {
      name: 'sad',
      url: 'https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/P_h5f6s1R78.png',
    },
    {
      name: 'thankful',
      url: 'https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/KlUlzF0jf_B.png',
    },
    {
      name: 'excited',
      url: 'https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/L7Bz9Ful5RR.png',
    },
    {
      name: 'in love',
      url: 'https://static.xx.fbcdn.net/rsrc.php/v3/ya/r/-hhJNn3C4Sq.png',
    },
    {
      name: 'crazy',
      url: 'https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/Ol_1-ILC-gy.png',
    },
    {
      name: 'grateful',
      url: 'https://static.xx.fbcdn.net/rsrc.php/v3/y3/r/Ol_1-ILC-gy.png',
    },
    {
      name: 'blissful',
      url: 'https://static.xx.fbcdn.net/rsrc.php/v3/yt/r/Hesq1FAsYCA.png',
    },
    {
      name: 'fantastic',
      url: 'https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/crW9WwUJ0PY.png',
    },
    {
      name: 'silly',
      url: 'https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/Ff2r0hOSeFV.png',
    },
    {
      name: 'festive',
      url: 'https://static.xx.fbcdn.net/rsrc.php/v3/yh/r/_lGWexz9yl8.png',
    },
    {
      name: 'cool',
      url: 'https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/8Ra5UUBdEoq.png',
    },
    {
      name: 'amused',
      url: 'https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/8Ra5UUBdEoq.png',
    },
    {
      name: 'relaxed',
      url: 'https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/UE8NpvgEc30.png',
    },
  ];
  /*  */
  navigateMap = new Map<string, string>([
    ['create', 'Create post'],
    ['edit', 'Photos/Video'],
    ['audience', 'Select audience'],
    ['tag', 'Tag people'],
    ['feeling', 'How do you feeling?'],
    ['location', 'Search for location'],
  ]);
  taggedPeoples: string[] = [];
  foundPeoples!: string[];
  getDialogTitle(key: string): string {
    const title: string = this.navigateMap.get(key) || '';
    return title;
  }
  audiences: AudienceCustomer[] = [
    {
      icon: 'public',
      title: 'Public',
      subTitle: 'Anyone on or off Facebook',
      type: 'radio',
    },
    {
      icon: 'people',
      title: 'Friend',
      subTitle: 'Your friends on Facebook',
      type: '',
    },
    {
      icon: 'people_outline',
      title: 'Friend except...',
      subTitle: 'Except:',
    },
    {
      icon: 'lock',
      title: 'Only me',
      subTitle: 'Anyone on or off Facebook',
      type: 'radio',
    },
    {
      icon: 'person',
      title: 'Specific friends',
      subTitle: 'Only show to some friends',
    },
    {
      icon: 'settings',
      title: 'Custom',
      subTitle: 'Include and exclude friends and list',
    },
  ];
  location!: Location | undefined;
  zoom: number = 10;
  locations: Location[] = [
    {
      lat: 10.8999964,
      lng: 106.7999968,
      label: { name: 'Di An', subName: 'Di An, Binh Duong Province, VietNam' },
    },
    {
      lat: 10.762622,
      lng: 106.660172,
      label: { name: 'Ho Chi Minh City', subName: 'Ho Chi Minh City, VietNam' },
    },
    {
      lat: 10.8999964,
      lng: 106.7999968,
      label: { name: 'Di An', subName: 'Di An, Binh Duong Province, VietNam' },
    },
    {
      lat: 10.762622,
      lng: 106.660172,
      label: { name: 'Ho Chi Minh City', subName: 'Ho Chi Minh City, VietNam' },
    },
  ];
  isSelectedFileButton: boolean = false;
  isEditAll: boolean = false;
  selectedFiles!: FileList;
  uploadedFiles: FileHandle[] = [];
  blob!: Blob;
  image!: SafeUrl;
  constructor(
    public domSanitizer: DomSanitizer,
    private uploadFile: UploadFileService
  ) {}
  ngOnInit(): void {}
  selectedFile($event: any) {
    const selectedFiles: FileList = $event.target.files;
    Object.keys(selectedFiles).map((key: any) => {
      const f = selectedFiles[key];
      if (f instanceof File) {
        this.uploadedFiles.push({
          file: f,
          url: this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(f)),
          backgroundImageValue: this.domSanitizer.bypassSecurityTrustStyle(
            `url(${URL.createObjectURL(f)})`
          ),
        });
      }
    });
    this.photoInput.nativeElement.value = '';
  }
  filesDropped(files: FileHandle[]) {
    this.uploadedFiles = files;
  }
  closePostImageContainerEle($event: MouseEvent) {
    $event.stopPropagation();

    if (this.uploadedFiles.length != 0) {
      this.uploadedFiles = [];
      this.photoInput.nativeElement.value = '';
    }
    this.isSelectedFileButton = !this.isSelectedFileButton;
  }

  onClickPhotoInput($event: any) {
    $event.stopPropagation();
    this.photoInput.nativeElement.click();
  }
  onClickEditAll() {
    this.prePage = this.selectedPage;
    this.selectedPage = 'edit';
  }
  onClickSelectAudience() {
    this.prePage = this.selectedPage;
    this.selectedPage = 'audience';
  }
  onClickTagPeople() {
    this.prePage = this.selectedPage;
    this.selectedPage = 'tag';
  }
  onClickFeeling() {
    this.prePage = this.selectedPage;
    this.selectedPage = 'feeling';
  }
  onClickLocation() {
    this.prePage = this.selectedPage;
    this.selectedPage = 'location';
  }
  backToPrePage() {
    this.selectedPage = this.prePage;
  }
  removeFile(i: number) {
    this.uploadedFiles = this.uploadedFiles.filter((f, index) => index != i);
  }
  tagPeople() {
    this.taggedPeoples.push('a');
    console.log(this.taggedPeoples);
  }
  removeTag(index: number) {
    this.taggedPeoples = this.taggedPeoples.filter((v, i) => i != index);
  }
  selectFeeling(feeling: any) {}
  selectLocation(index: number) {
    this.location = this.locations.find((v, i) => i == index);
  }
  closeLocation() {
    this.location = undefined;
  }
}
