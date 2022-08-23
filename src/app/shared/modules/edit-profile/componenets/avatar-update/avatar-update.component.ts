import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { forkJoin, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AVATAR_SPECIE, COVER_SPECIE, POST_SPECIE } from 'src/app/shared/models/constant';
import { FilterFileUpload } from 'src/app/shared/models/model';
import { UploadFileResponse, UserProfileResponse } from 'src/app/shared/models/response';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';
import { FilterPostService } from 'src/app/user/services/filter-post.service';
import { UploadFileService } from 'src/app/user/services/upload-file.service';
import { UserService } from 'src/app/user/services/user.service';
import { ChooseImageComponent } from '../choose-image/choose-image.component';

@Component({
  selector: 'app-avatar-update',
  templateUrl: './avatar-update.component.html',
  styleUrls: ['./avatar-update.component.scss'],
  providers: [
    {provide: 'AVATAR_FILTER', useClass: FilterPostService},
    {provide: 'COVER_FILTER', useClass: FilterPostService},
    {provide: 'POST_FILTER', useClass: FilterPostService},
  ]
})
export class AvatarUpdateComponent implements OnInit {
  sltType = 0
  uploadedAvatars: UploadFileResponse[] = [];
  uploadedCovers: UploadFileResponse[] = [];
  uploadedPosts: UploadFileResponse[] = [];
  currUser!: UserProfileResponse | null;
  avatarFile?: File;
  avatarSrc!: string | ArrayBuffer | null;
  sltUploadedFile!: UploadFileResponse
  constructor(
    private userService: UserService,
    private uploadFileService: UploadFileService,
    @Inject("AVATAR_FILTER") private avatarFilterPostService: FilterPostService,
    @Inject("COVER_FILTER") private coverFilterPostService: FilterPostService,
    @Inject("POST_FILTER") private postFilterPostService: FilterPostService,
    public directLinkService: DirectLinkService,
    private dialogRef: MatDialogRef<ChooseImageComponent>
  ) {}

  ngOnInit(): void {
    this.currUser = this.userService.userBSub.value;
    let currAvatarFilter: FilterFileUpload =
      this.avatarFilterPostService.fileUploadFilterBSub.value;
      currAvatarFilter.specie = AVATAR_SPECIE
      currAvatarFilter.userId = this.currUser?.id
      currAvatarFilter.pageable!.pageSize = 6
      
      let currCoverFilter: FilterFileUpload =
      this.coverFilterPostService.fileUploadFilterBSub.value;
      currCoverFilter.specie = COVER_SPECIE
      currCoverFilter.userId = this.currUser?.id
      currCoverFilter.pageable!.pageSize = 6

      let currPostFilter: FilterFileUpload =
      this.postFilterPostService.fileUploadFilterBSub.value;
      currPostFilter.specie = POST_SPECIE
      currPostFilter.userId = this.currUser?.id
      currPostFilter.pageable!.pageSize = 18

    let avatars$ = this.uploadFileService.findAll(currAvatarFilter)
    let covers$ = this.uploadFileService.findAll(currCoverFilter)
    let posts$ = this.uploadFileService.findAll(currPostFilter)
    combineLatest([avatars$, covers$, posts$]).pipe(
      tap(([avatars, covers, posts]) => {
        this.uploadedAvatars = avatars.map(file => {
          let directLink = this.directLinkService.getDirectLinkAvatar(this.currUser!.id, file.name, file.ext)
          return {...file, directLink: directLink}
        })
        this.uploadedCovers = covers.map(file => {
          let directLink = this.directLinkService.getDirectLinkCoverImage(this.currUser!.id, file.name, file.ext)
          return {...file, directLink: directLink}
        })
        this.uploadedPosts = posts.map(file => {
          let directLink = this.directLinkService.getDirectLinkImage(this.currUser!.id, file.name, file.ext)
          return {...file, directLink: directLink}
        })
      })
    ).subscribe(response => {
      console.log(response);
      
    })
  }
  choiceExistImage(sltUploadedFile: UploadFileResponse) {
    this.avatarSrc = sltUploadedFile.directLink
    this. sltUploadedFile = sltUploadedFile
  }
  saveUpdateAvatar(){
    if(this.avatarFile){
      this.uploadFileService
          .uploadAvatar(this.avatarFile)
          .subscribe((response) => {
            this.avatarFile = undefined;
            this.avatarSrc = null;
            let currUser = this.userService.userBSub.value;
            currUser!.coverImage = response;
            this.userService.userBSub.next(currUser);
            this.dialogRef.close();
          });
    }else if(this.sltUploadedFile){
      this.userService
      .updateAvatarByExistFile(this.sltUploadedFile.id, this.currUser!.id)
      .subscribe((user) => {
        this.userService.userBSub.next(user);
        this.dialogRef.close();
      })
    }
  }
  coverImageChange(avatarInput: HTMLInputElement){
    const fileList: FileList | null = avatarInput.files;
    if (fileList && fileList.length > 0) {
      const sltFile = fileList[0];
      this.avatarFile = sltFile;
      const render = new FileReader();
      render.readAsDataURL(sltFile);
      render.onload = (event: ProgressEvent<FileReader>) => {
        this.avatarSrc = render.result;
      };
    }
  }
  
}
