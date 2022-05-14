import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { UploadFileService } from '../../services/upload-file.service';
import { CreatePostDialogComponent } from './dialog/create-post-dialog/create-post-dialog.component';
export interface User {
  name: string;
  url: string;
}
export interface Comment {
  user: User;
  content: string;
  comments?: Comment[];
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  zoom: number = 15;
  title = 'travel';
  lat = 10.924067;
  lng = 106.713028;
  locations: any[] = [
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
  /*  */
  selectedFiles!: FileList;
  currentFile!: File | null;
  progress = 0;
  message!: string;
  fileInfos!: Observable<any> | undefined;
  img: any;
  /* Customize Commend */
  commentTree: Comment[] = [
    {
      user: {
        name: 'Đoàn Trung Hải',
        url: '84c1252b0128cf769639 - Copy (2).jpg',
      },
      content: 'This is a comment',
      comments: [
        {
          user: {
            name: 'Thanh Trúc',
            url: '84c1252b0128cf769639 - Copy (2).jpg',
          },
          content: 'This is a comment',
          comments: [],
        },
        {
          user: {
            name: 'Phi Hoàng',
            url: '84c1252b0128cf769639 - Copy (2).jpg',
          },
          content: 'This is a comment',
          comments: [
            {
              user: {
                name: 'Thiên Nguyễn',
                url: '84c1252b0128cf769639 - Copy (2).jpg',
              },
              content: 'This is a comment',
            },
          ],
        },
      ],
    },
    {
      user: {
        name: 'Hạ Ngọc Huyền',
        url: '84c1252b0128cf769639 - Copy (2).jpg',
      },
      content: 'This is a comment',
      comments: [
        {
          user: {
            name: 'Huynh Gia Huy 1',
            url: '84c1252b0128cf769639 - Copy (2).jpg',
          },
          content: 'This is a comment',
          comments: [],
        },
      ],
    },
  ];
  constructor(
    private _uploadFileService: UploadFileService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  selectedFile($event: any) {
    this.selectedFiles = $event.target.files;
    console.log($event);
  }
  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    if (this.currentFile) {
      console.log(this.currentFile);
      this._uploadFileService.upload(this.currentFile).subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.progress = Math.round((100 * event.loaded) / event.total);
            console.log(this.progress);
          } else if (event instanceof HttpResponse) {
            console.log('ok');
            this.message = event.body ? event.body.message : '';
            this.fileInfos = this._uploadFileService.getFiles();
          }
        },
        (err) => {
          this.progress = 0;
          this.message = 'Could not upload the file';
          this.fileInfos = undefined;
        }
      );
    }
  }
  getFiles() {
    this._uploadFileService.getFiles().subscribe((files) => {
      console.log(files);
    });
  }
  showImage() {
    this._uploadFileService.showImage().subscribe((v) => {
      this.img = v;
    });
  }
  openCreatePostDialog() {
    const dialogRef = this._dialog.open(CreatePostDialogComponent, {
      width: 'auto',
    });
  }
  navigateTo(element: any) {
    element.scrollIntoView({ behavior: 'smooth' });
    element.focus();
  }
  onClickRepUser(username: string, replyInputElement: HTMLInputElement) {
    replyInputElement.value = username + ` `;
    replyInputElement.focus();
    replyInputElement.select();
  }
}
