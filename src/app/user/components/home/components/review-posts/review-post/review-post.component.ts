import { FollowService } from './../../../../../services/follow.service';
import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { concat, forkJoin, Observable, ObservableInput, of } from 'rxjs';
import { map, switchMap, concatMap, tap } from 'rxjs/operators';
import { APIResponse, Pageable } from 'src/app/shared/models/model';
import {
  PagingResponse,
  PostReactResponse,
  ReviewPostResponse,
  UserProfileResponse,
  UserReactResponse,
} from 'src/app/shared/models/response';
import { DateUtilsService } from 'src/app/user/services/date-utils.service';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';
import { FilterPostService } from 'src/app/user/services/filter-post.service';
import { PostReactService } from 'src/app/user/services/post-react.service';
import { ProgressBarService } from 'src/app/user/services/progress-bar.service';
import { ReviewPostService } from 'src/app/user/services/review-post.service';
import { UploadFileService } from 'src/app/user/services/upload-file.service';
import { UserReactService } from 'src/app/user/services/user-react.service';
import { UserService } from 'src/app/user/services/user.service';
import { ReviewPostDestroyService } from '../review-post-destroy.service';

@Component({
  selector: 'app-review-post',
  templateUrl: './review-post.component.html',
  styleUrls: ['./review-post.component.scss'],
  providers: [FilterPostService],
})
export class ReviewPostComponent implements OnInit {
  @Input()
  reviewPost!: ReviewPostResponse;
  @Output()
  updatedPostUser = new EventEmitter<UserProfileResponse>()
  postUser!: UserProfileResponse;
  user!: UserProfileResponse | null;
  createdDate!: string;
  postReact$!: Observable<PostReactResponse>;
  postUserReputation!: number;
  userAvatarSrc!: string;
  isFollowed!: Boolean
  postUserRefresh$!: Observable<[UserProfileResponse, Boolean]>
  /* Fake data */
  commentTree: any = [
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
    private followService: FollowService,

  ) {
  }

  ngOnInit(): void {
    this.postUser = this.reviewPost.user
    this.user = this.userService.userBSub.value
    /* Setup user avatar */
    if (this.postUser.avatar) {
      this.userAvatarSrc = this.directLinkService.getUserAvatar(this.postUser.avatar.name, this.postUser.avatar.ext, this.postUser.username)
    } else {
      this.userAvatarSrc = this.directLinkService.getDefaultAvatarURL(this.postUser.gender)
    }
    this.createdDate = this.dateUtilsService.dateTimeFormula(
      this.reviewPost.createdDate
    );
    /* Fetch post react */
    this.postReact$ = this.postReactService.findByReviewPostId(this.reviewPost.id)
   
  }

  openReviewDetail(reviewPostId: number) {
    this.router.navigate([`/home/review-posts/${reviewPostId}`]);
  }
  onClickVote(reviewPost: ReviewPostResponse, react: -1 | 1) {
    let user = this.userService.userBSub.value;
    this.userReactService
      .updateUserReact(user!.id, react, reviewPost.id)
      .pipe(
        tap((userReact: UserReactResponse) => {
          this.reviewPost.userReact = userReact
        }),
        tap((_) => {
          this.postReact$ = this.postReactService.findByReviewPostId(this.reviewPost.id)
          this.userService.findByUserId(this.postUser.id).subscribe(postUser => {
            if (postUser) {
              this.postUserReputation = postUser.reputation
              this.updatedPostUser.emit(postUser)
            }
          })
        }
        ))
      .subscribe();
  }
  requestFollow(userId: number) {
    this.followService.requestFollow(userId).subscribe(_ => {
      this.isFollowed = true
    },
      error => {

      })
  }
  requestUnFollow(userId: number) {
    this.followService.requestUnfollow(userId).subscribe(_ => {
      this.isFollowed = false
    },
      error => {

      })
  }
  fetchPostUser(postUserId: number){
    this.postUserRefresh$ = forkJoin([this.userService.findByUserId(postUserId), this.followService.checkFollowPostUser(this.postUser.id)]).pipe(tap(response => {
      this.postUser = response[0]
      this.isFollowed = response[1]
      console.log(response)
    }))
  }
   
}
