import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { tap } from 'rxjs/operators';
import { APPROVE_STATUS, DENY_STATUS } from 'src/app/shared/models/constant';
import { JourneyPostResponse, UserProfileResponse, PostReactResponse, UserReactResponse } from 'src/app/shared/models/response';
import { DateUtilsService } from 'src/app/user/services/date-utils.service';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';
import { FilterPostService } from 'src/app/user/services/filter-post.service';
import { FollowService } from 'src/app/user/services/follow.service';
import { JourneyPostService } from 'src/app/user/services/journey-post.service';
import { PostReactService } from 'src/app/user/services/post-react.service';
import { ProgressBarService } from 'src/app/user/services/progress-bar.service';
import { ReviewPostService } from 'src/app/user/services/review-post.service';
import { UploadFileService } from 'src/app/user/services/upload-file.service';
import { UserReactService } from 'src/app/user/services/user-react.service';
import { UserService } from 'src/app/user/services/user.service';
import { ReviewPostDestroyService } from '../../review-posts/review-post-destroy.service';

@Component({
  selector: 'app-journey-post',
  templateUrl: './journey-post.component.html',
  styleUrls: ['./journey-post.component.scss']
})
export class JourneyPostComponent implements OnInit {
  @Input()
  journeyPost!: JourneyPostResponse;
  @Input()
  isAdmin!: boolean;
  @Output()
  updatedPostUser = new EventEmitter<UserProfileResponse>();
  postUser!: UserProfileResponse;
  user!: UserProfileResponse | null;
  createdDate!: string;
  postReact$!: Observable<PostReactResponse>;
  postUserReputation!: number;
  userAvatarSrc!: string;
  isFollowed!: Boolean;
  postUserRefresh$!: Observable<[UserProfileResponse, Boolean]>;
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
    private userService: UserService,
    private router: Router,
    public directLinkService: DirectLinkService,
    public progressBarService: ProgressBarService,
    private userReactService: UserReactService,
    private dateUtilsService: DateUtilsService,
    private postReactService: PostReactService,
    private followService: FollowService,
    private journeyPostService: JourneyPostService
  ) {}

  ngOnInit(): void {
    console.log(this.journeyPost);
    
    this.postUser = this.journeyPost.user;
    this.user = this.userService.userBSub.value;
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
    this.createdDate = this.dateUtilsService.dateTimeFormula(
      this.journeyPost.createdDate
    );
    /* Fetch post react */
    this.postReact$ = this.postReactService.findByJourneyPostId(
      this.journeyPost.id
    );
    this.postReact$.subscribe(v => {
      console.log(v);
      
    })
  }

  openReviewDetail(reviewPostId: number) {
    this.router.navigate([`/home/review-posts/${reviewPostId}`]);
  }
  onClickVote(journeyPost: JourneyPostResponse, react: -1 | 1) {
    let user = this.userService.userBSub.value;
    this.userReactService
      .updateJourneyPostUserReact(user!.id, react, journeyPost.id)
      .pipe(
        tap((userReact: UserReactResponse) => {
          this.journeyPost.userReact = userReact;
        }),
        tap((_) => {
          this.postReact$ = this.postReactService.findByJourneyPostId(
            this.journeyPost.id
          );
          this.postReact$.subscribe(v => console.log(v))
        })
        )
        .subscribe(v => {
        console.log(v);
        console.log(this.journeyPost);
      });
  }
  requestFollow(userId: number) {
    this.followService.requestFollow(userId).subscribe(
      (_) => {
        this.isFollowed = true;
      },
      () => {}
    );
  }
  requestUnFollow(userId: number) {
    this.followService.requestUnfollow(userId).subscribe(
      (_) => {
        this.isFollowed = false;
      },
      () => {}
    );
  }
  fetchPostUser(postUserId: number) {
    this.postUserRefresh$ = forkJoin([
      this.userService.findByUserId(postUserId),
      this.followService.checkFollowPostUser(this.postUser.id),
    ]).pipe(
      tap((response) => {
        this.postUser = response[0];
        this.isFollowed = response[1];
        console.log(response);
      })
    );
  }
  /* ADMIN */
  onClickApprove(journeyPost: JourneyPostResponse) {
    journeyPost.status = APPROVE_STATUS;
  }
  onClickDeny(journeyPost: JourneyPostResponse) {
    journeyPost.status = DENY_STATUS;
  }
  openJourneyDetail(journeyPostId: number) {
    this.router.navigate([`/home/journey-posts/${journeyPostId}`]);
  }
  updateByStatus(journeyPost: JourneyPostResponse, status: string) {
    this.journeyPostService
      .updateByStatus(journeyPost.id, status)
      .subscribe((response) => {
        journeyPost.status = response.status
      });
  }
}
