import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { map, tap } from 'rxjs/operators';
import { COVER_SPECIE } from 'src/app/shared/models/constant';
import { FilterFileUpload } from 'src/app/shared/models/model';
import {
  UploadFileResponse,
  UserProfileResponse,
} from 'src/app/shared/models/response';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';
import { FilterPostService } from 'src/app/user/services/filter-post.service';
import { UploadFileService } from 'src/app/user/services/upload-file.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-choose-image',
  templateUrl: './choose-image.component.html',
  styleUrls: ['./choose-image.component.scss'],
  providers: [FilterPostService],
})
export class ChooseImageComponent implements OnInit {
  currUserFileUploads: UploadFileResponse[] = [];
  currUser!: UserProfileResponse | null;
  constructor(
    private userService: UserService,
    private uploadFileService: UploadFileService,
    private filterPostService: FilterPostService,
    public directLinkService: DirectLinkService,
    private dialogRef: MatDialogRef<ChooseImageComponent>
  ) {}

  ngOnInit(): void {
    this.currUser = this.userService.userBSub.value;
    let filterFileUpload: FilterFileUpload =
      this.filterPostService.fileUploadFilterBSub.value;
    filterFileUpload.userId = this.currUser?.id;
    filterFileUpload.specie = COVER_SPECIE
    this.filterPostService.fileUploadFilterBSub.next(filterFileUpload);
    this.uploadFileService.findAll(filterFileUpload).pipe(
      tap(response => {
        this.currUserFileUploads = response.map(file => {
          let directLink = this.directLinkService.getDirectLinkCoverImage(this.currUser!.id, file.name, file.ext)
          return {...file, directLink: directLink}
        })
      })
    ).subscribe()
  }
  choiceExistImage(sltUploadedFile: UploadFileResponse) {
    this.dialogRef.close({
      sltUploadedFile: sltUploadedFile,
    });
  }
}
