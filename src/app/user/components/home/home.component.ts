import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
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
  srcReactIcons = [
    'https://scontent.xx.fbcdn.net/m1/v/t6/An8ODe1zojZFxtkCySvD_PWHUfwwSqPRWxNfZiVRQtoYgVOHHeQxpmcNcbugcbUbDZvtBac7oXZXBUiZytVCug9oYjJureLV-72SKTQ6uZ2bhOnT.png?ccb=10-5&oh=00_AT_bfcz4k5d9vic52C5Ho_5EBR-btosnXSISkYC0rVa5bQ&oe=628472D1&_nc_sid=55e238',
    'https://scontent.xx.fbcdn.net/m1/v/t6/An99VM2rY72PntBkBOhM_HWN8idYosYnOIsewbGZjMdDq3EUPhv-6VKQFZWM35g4zgPaQ8JMtsjyZm9r4nQSBLpZJm1XHoyq9mDTUQ9Zq-HthVWH.png?ccb=10-5&oh=00_AT800j7sgyW4cGR-RzGuYZBoclRv9nEgLnmaM6amg32XOA&oe=628407F8&_nc_sid=55e238',
    'https://scontent.xx.fbcdn.net/m1/v/t6/An-XPBmopWw6qcoRXNJ62ttat7JnWkwC5lGxM1yMHoXVpnkQMTc_AToevZowBIrrvsMyHpSQGrtdAcCQ9IorFar_xvy2Fz2Fe7gr1XXtznu2EWowFFhK.png?ccb=10-5&oh=00_AT_Ewt7DWvDC7jxKJ5wbBldSjLXraDcu9pp0OXgk17o_pQ&oe=62845702&_nc_sid=55e238',
    'https://scontent.xx.fbcdn.net/m1/v/t6/An85IUb4K3Vsz4ZBK3nmyxV5BvrVvAeb_MN1EyK1cShAmOKb2DKKSw6TbYCRpwvQRkegvSStvh9s942eRgsl2tFL70Ec7AvPlHjLW8b9HY6bFbXN.png?ccb=10-5&oh=00_AT_nLSxTMcUuzuzWroQgEAMjerakFv6L96MRmYKq3lM32w&oe=62853AFB&_nc_sid=55e238',
    'https://scontent.xx.fbcdn.net/m1/v/t6/An_H9Ao3uEtYIkxo3s8MpEyxcsLlzHZfZDm1sesMSGAjp0YZVuOIAips1GGtdXE2udIWRwccuPsURKBQxOp6FmgFieVvVawBonRlxh0jKuAABSdGpFw.png?ccb=10-5&oh=00_AT9WEu5WyMzRoDNkB5LFVe4zfOhI0HIClhzxkK8AXu375A&oe=6285904F&_nc_sid=55e238',
    'https://scontent.xx.fbcdn.net/m1/v/t6/An_owOs-UygJd2yvWszP_T3PnMzukn-wa2jnUrpbfAe-TWiVkC0kn11oCbOXjHh2hXNliWJVDSndPV2L6Nxp2bRzVrkkieVQmgZWQG0iTvoL699o7FQD.png?ccb=10-5&oh=00_AT_on0BxW3y3BsyUWzF3sX98lRS-9I5I6Zc2lXrsWAkmwg&oe=62859660&_nc_sid=55e238',
    'https://scontent.xx.fbcdn.net/m1/v/t6/An_p_GtpsNlMDEVWZr4AFkAPfy93yAtD7360WrRMu5gFpN7XbkK_meoLOk_IRtI6AwKbiv7I2VaOaEwXhFWrmpNNBG8nKmGs_rVlYdUOYpXf3bWw.png?ccb=10-5&oh=00_AT_Xhclck1nbd7jjTOgEhPvTUssqV1lL68fcTY3QetiSYg&oe=62847CCC&_nc_sid=55e238',
  ];
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
  isShowComments: boolean = false;
  constructor(
    private _uploadFileService: UploadFileService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {}
  selectedFile($event: any) {
    this.selectedFiles = $event.target.files;
  }
  upload() {
    this.progress = 0;
    this.currentFile = this.selectedFiles.item(0);
    if (this.currentFile) {
      this._uploadFileService.upload(this.currentFile).subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.progress = Math.round((100 * event.loaded) / event.total);
          } else if (event instanceof HttpResponse) {
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
  selectNewReact(oldEle: HTMLElement, newEle: HTMLElement) {
    const cloneNewEle = newEle.cloneNode(false);
    console.log(cloneNewEle);
    /* cloneNewEle.setAttribute(
      'style',
      `width: ${oldEle.offsetWidth}px; height: ${oldEle.offsetHeight}px`
    ); */
    oldEle.replaceWith(cloneNewEle);
  }
}
