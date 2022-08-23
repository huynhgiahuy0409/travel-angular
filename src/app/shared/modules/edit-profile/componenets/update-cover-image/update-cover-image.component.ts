import {
  UploadFileResponse,
  UserProfileResponse,
} from './../../../../models/response';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChooseImageComponent } from '../choose-image/choose-image.component';
import { UploadFileService } from 'src/app/user/services/upload-file.service';
import { UserService } from 'src/app/user/services/user.service';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';

@Component({
  selector: 'app-update-cover-image',
  templateUrl: './update-cover-image.component.html',
  styleUrls: ['./update-cover-image.component.scss'],
})
export class UpdateCoverImageComponent implements OnInit {
  uploadType!: number;
  currUser!: UserProfileResponse | null;
  /* cover image */
  coverImageFile?: File;
  coverImageSrc!: string | ArrayBuffer | null;
  sltUploadedFile!: UploadFileResponse;
  /* view child */
  @ViewChild('editCoverImageBtn')
  editCoverImageBtn!: ElementRef<HTMLElement>;
  @ViewChild('coverImageInput')
  coverImageInput!: ElementRef<HTMLElement>;
  @ViewChild('coverImageActionSelect') coverImageActionSelect!: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<UpdateCoverImageComponent>,
    private matDialog: MatDialog,
    private uploadFileService: UploadFileService,
    private userService: UserService,
    private directLinkService: DirectLinkService
  ) {}

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.currUser = user;
    });
  }
  openDialogChooseImage() {
    let matDialog = this.matDialog.open(ChooseImageComponent, {
      width: '550px',
    });
    matDialog.afterClosed().subscribe((response) => {
      if (response) {
        console.log(response);

        this.sltUploadedFile = response.sltUploadedFile;
        this.coverImageSrc = this.directLinkService.getDirectLinkImage(
          this.currUser!.id,
          this.sltUploadedFile.name,
          this.sltUploadedFile.ext
        );
      }
    });
  }
  coverImageChange(coverImageInput: HTMLInputElement) {
    const fileList: FileList | null = coverImageInput.files;
    if (fileList && fileList.length > 0) {
      const sltFile = fileList[0];
      this.coverImageFile = sltFile;
      const render = new FileReader();
      render.readAsDataURL(sltFile);
      render.onload = (event: ProgressEvent<FileReader>) => {
        this.coverImageSrc = render.result;
      };
    }
  }
  saveCoverImage() {
    if (this.uploadType === 0 && this.sltUploadedFile) {
      this.userService
        .updateCoverByExistFile(this.sltUploadedFile.id, this.currUser!.id)
        .subscribe((user) => {
          console.log(user);
          this.userService.userBSub.next(user);
          this.dialogRef.close();
        });
    } else if (this.uploadType === 1) {
      if (this.coverImageFile) {
        this.uploadFileService
          .uploadCoverImage(this.coverImageFile)
          .subscribe((response) => {
            this.coverImageFile = undefined;
            this.coverImageSrc = null;
            let currUser = this.userService.userBSub.value;
            currUser!.coverImage = response;
            this.userService.userBSub.next(currUser);
            this.dialogRef.close();
          });
      } else {
        console.log('not file');
      }
    }
  }
  sltUploadType(type: number) {
    if (type === 0) {
      this.uploadType = 0;
      this.openDialogChooseImage();
    } else if (type === 1) {
      this.uploadType = 1;
      this.coverImageInput.nativeElement.click();
    }
  }
}
