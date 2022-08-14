import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  CommercialPostResponse,
  UserProfileResponse,
} from 'src/app/shared/models/response';
import { ReviewPostDestroyService } from 'src/app/user/components/home/components/review-posts/review-post-destroy.service';
import { DateUtilsService } from 'src/app/user/services/date-utils.service';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';
import { FilterPostService } from 'src/app/user/services/filter-post.service';
import { FollowService } from 'src/app/user/services/follow.service';
import { PostReactService } from 'src/app/user/services/post-react.service';
import { ProgressBarService } from 'src/app/user/services/progress-bar.service';
import { ReviewPostService } from 'src/app/user/services/review-post.service';
import { UploadFileService } from 'src/app/user/services/upload-file.service';
import { UserReactService } from 'src/app/user/services/user-react.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-commercial-item',
  templateUrl: './commercial-item.component.html',
  styleUrls: ['./commercial-item.component.scss'],
})
export class CommercialItemComponent implements OnInit {
  @Input()
  commercialPost!: CommercialPostResponse;
  postUser!: UserProfileResponse;
  user!: UserProfileResponse | null;
  userAvatarSrc!: string;
  coverImageSrc!: string;
  isFollowed!: Boolean;
  postUserRefresh$!: Observable<[UserProfileResponse, Boolean]>;
  role?: string
  constructor(
    private _uploadFileService: UploadFileService,
    private _dialog: MatDialog,
    private renderer: Renderer2,
    private reviewPostService: ReviewPostService,
    private userService: UserService,
    private router: Router,
    private reviewPostDestroyService: ReviewPostDestroyService,
    private filterPostService: FilterPostService,
    public directLinkService: DirectLinkService,
    private fb: FormBuilder,
    public progressBarService: ProgressBarService,
    private userReactService: UserReactService,
    private dateUtilsService: DateUtilsService,
    private postReactService: PostReactService,
    private followService: FollowService
  ) {
  }
  
  ngOnInit(): void {
    this.postUser = this.commercialPost.user;
    this.user = this.userService.userBSub.value;
    this.role = this.user?.roleName === "ROLE_ADMIN"? "Quản trị viên": undefined
    /* Setup user avatar */
    if (this.postUser.avatar) {
      this.userAvatarSrc = this.directLinkService.getUserAvatar(
        this.postUser.avatar.name,
        this.postUser.avatar.ext,
        this.postUser.username
      );
    } else {
      this.userAvatarSrc = this.directLinkService.getDefaultAvatarURL(
        this.postUser.gender
      );
    }
    this.coverImageSrc = this.directLinkService.getURLImage(
      this.postUser.email,
      this.commercialPost.commercialCoverImage.name,
      this.commercialPost.commercialCoverImage.ext
    );
  }
}
