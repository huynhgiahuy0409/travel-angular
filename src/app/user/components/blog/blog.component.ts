import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UploadFileResponse,
  UserProfileResponse,
} from 'src/app/shared/models/response';
import { ChooseImageComponent } from 'src/app/shared/modules/edit-profile/componenets/choose-image/choose-image.component';
import { EditProfileComponent } from 'src/app/shared/modules/edit-profile/componenets/edit-profile/edit-profile.component';
import { DirectLinkService } from '../../services/direct-link.service';
import { UploadFileService } from '../../services/upload-file.service';
import { UserService } from '../../services/user.service';
import { FormControl, Validators } from '@angular/forms';
import { ShowAvatarComponent } from './dialogs/show-avatar/show-avatar.component';
import { ShowCoverComponent } from './dialogs/show-cover/show-cover.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  blogUserId!: number;
  blogUser$!: Observable<UserProfileResponse | null>;
  isCurrUser: boolean = false;
  /* cover image */
  coverImageFile?: File;
  coverImageSrc!: string | ArrayBuffer | null;
  /* view child */
  @ViewChild('editCoverImageBtn', { read: ElementRef })
  editCoverImageBtn!: ElementRef;
  @ViewChild('coverImageActionSelect') coverImageActionSelect!: ElementRef;
  @ViewChild('coverImageInput')
  coverImageInput!: ElementRef<HTMLElement>;
  uploadType!: number;
  sltUploadedFile!: UploadFileResponse;
  defaultAvatarURL!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private matDialog: MatDialog,
    public directLinkService: DirectLinkService,
    private uploadFileService: UploadFileService
  ) {}

  ngOnInit(): void {
    let currUserId = this.userService.userBSub.value!.id;
    this.activatedRoute.queryParams.subscribe((queryPrams) => {
      this.blogUserId = queryPrams.uid;
      if (this.blogUserId != currUserId) {
        this.blogUser$ = this.userService.findByUserId(this.blogUserId);
        this.isCurrUser = false;
      } else {
        this.blogUser$ = this.userService.user$;
        this.isCurrUser = true;
      }
    });
    this.blogUser$ = this.blogUser$.pipe(
      map((user) => {
        if (user) {
          const { avatar, coverImage } = user;
          if (avatar) {
            let directLinkAvatar = this.directLinkService.getDirectLinkAvatar(
              user.id,
              avatar.name,
              avatar.ext
            );
            avatar.directLink = directLinkAvatar;
          } else {
            user.defaultAvatarURL = this.directLinkService.getDefaultAvatarURL(
              user.gender
            );
          }
          if (coverImage) {
            let directLinkCoverImage =
              this.directLinkService.getDirectLinkCoverImage(
                user.id,
                coverImage.name,
                coverImage.ext
              );
            coverImage.directLink = directLinkCoverImage;
          }
        }
        return user;
      })
    );
  }
  openDialogEditProfile(currUser: UserProfileResponse | null) {
    this.matDialog.open(EditProfileComponent, {
      data: {
        currUser: currUser,
      },
      minWidth: '700px',
    });
  }
  onClickEditCoverImage($event: MouseEvent, coverImageActionSelect: HTMLElement) {
    $event.stopPropagation()
    coverImageActionSelect.classList.toggle('show');
  }
  @HostListener('click', ['$event'])
  clickOutEditCoverImageBtn(event: any) {
    if (this.editCoverImageBtn) {
      if (
        event.target != this.editCoverImageBtn.nativeElement &&
        event.target.parentElement != this.coverImageActionSelect.nativeElement
      ) {
        if (
          this.coverImageActionSelect.nativeElement.classList.contains('show')
        ) {
          this.coverImageActionSelect.nativeElement.classList.remove('show');
        }
      }
    }
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
  cancelCoverImage($event: MouseEvent) {
    $event.stopPropagation()
    this.coverImageFile = undefined;
    this.coverImageSrc = null;
  }
  saveCoverImage($event: MouseEvent) {
    $event.stopPropagation()
    if (this.uploadType === 0 && this.sltUploadedFile) {
      this.userService
        .updateCoverByExistFile(this.sltUploadedFile.id, this.blogUserId)
        .subscribe((user) => {
          this.coverImageSrc = null;
          this.userService.userBSub.next(user);
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
          });
      } else {
        console.log('not file');
      }
    }
  }
  removeCoverImage($event: MouseEvent, user: UserProfileResponse) {
    $event.stopPropagation()
    this.uploadFileService.removedCoverImage(user.id).subscribe((response) => {
      if (response === true) {
        user.coverImage = null;
        this.userService.userBSub.next(user);
      }
    });
  }
  openDialogChooseImage() {
    let matDialog = this.matDialog.open(ChooseImageComponent, {
      width: '550px',
    });
    matDialog.afterClosed().subscribe((response) => {
      if (response) {
        this.sltUploadedFile = response.sltUploadedFile;
        this.coverImageSrc = this.directLinkService.getDirectLinkCoverImage(
          this.blogUserId,
          this.sltUploadedFile.name,
          this.sltUploadedFile.ext
        );
      }
    });
  }
  sltUploadType($event: MouseEvent, type: number) {
    $event.stopPropagation()
    if (type === 0) {
      this.uploadType = 0;
      this.openDialogChooseImage();
    } else if (type === 1) {
      this.uploadType = 1;
      this.coverImageInput.nativeElement.click();
    }
  }
  bioCtrl: FormControl = new FormControl('', Validators.required)
  isAddBio = false
  onClickAddBio(){
    this.isAddBio = true
  }
  updateUserBio(bio: string, userId: number){
    this.userService.updateBio(bio, userId).subscribe(response => {
      if(response){
        this.userService.userBSub.next(response)
        this.isAddBio = false
      }
    })
  }
  onClickEditUserBio(bio: string){
    this.isAddBio = true
    this.bioCtrl.setValue(bio)
  }
  showAvatar(user: UserProfileResponse){
    this.matDialog.open(ShowAvatarComponent,{
      data: {
        blogUser: user,
      },
    })
  }
  showCover(user: UserProfileResponse){
    this.matDialog.open(ShowCoverComponent,{
      data: {
        blogUser: user,
      },
    })
  }
}
