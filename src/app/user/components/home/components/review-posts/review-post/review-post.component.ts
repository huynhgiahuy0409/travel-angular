import { FollowService } from './../../../../../services/follow.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { FormControl, UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { concat, forkJoin, Observable, ObservableInput, of } from 'rxjs';
import { map, switchMap, concatMap, tap } from 'rxjs/operators';
import { APIResponse, Pageable } from 'src/app/shared/models/model';
import {
  PagingResponse,
  PostCommentResponse,
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
import { APPROVE_STATUS, DENY_STATUS, REVIEW_POST_TYPE } from 'src/app/shared/models/constant';
import { EditProfileComponent } from 'src/app/shared/modules/edit-profile/componenets/edit-profile/edit-profile.component';
import { CommentService } from 'src/app/user/services/comment.service';
import { CommentRequest } from 'src/app/shared/models/request';

@Component({
  selector: 'app-review-post',
  templateUrl: './review-post.component.html',
  styleUrls: ['./review-post.component.scss'],
  providers: [FilterPostService, CommentService],
})
export class ReviewPostComponent implements OnInit {
  reviewPostType: string = REVIEW_POST_TYPE
  @Input()
  reviewPost!: ReviewPostResponse;
  @Input()
  isAdmin!: boolean;
  @Output()
  updatedPostUser = new EventEmitter<UserProfileResponse>();
  postUser$!: Observable<UserProfileResponse | null>;
  currUser$!: Observable<UserProfileResponse | null>;
  createdDate!: string;
  postReacts$!: Observable<PostReactResponse>;
  postComment!: PostCommentResponse
  postUserReputation!: number;
  userAvatarSrc!: string;
  isFollowed!: Boolean;
  postUserRefresh$!: Observable<[UserProfileResponse, Boolean]>;
  isCurrUser = false;
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
    private reviewPostService: ReviewPostService,
    private userService: UserService,
    private router: Router,
    public directLinkService: DirectLinkService,
    public progressBarService: ProgressBarService,
    private userReactService: UserReactService,
    private dateUtilsService: DateUtilsService,
    private postReactService: PostReactService,
    private followService: FollowService,
    private matDialog: MatDialog,
    private commentService: CommentService,
  ) {}

  ngOnInit(): void {
    let postUserId = this.reviewPost.user.id;
    this.currUser$ = this.userService.user$
    this.userService.user$.subscribe(user => {
      if(user){
        if (postUserId === user.id) {
          this.isCurrUser = true;
          this.postUser$ = this.userService.user$;
        } else {
          this.isCurrUser = false;
          this.postUser$ = of(this.reviewPost.user);
        }
      }
    })
    this.createdDate = this.dateUtilsService.dateTimeFormula(
      this.reviewPost.createdDate
    );
    /* Fetch post reacts */
    this.postReacts$ = this.postReactService.findByReviewPostId(
      this.reviewPost.id
    );
    /* Fetch post comment */
    let currCommentFilter = this.commentService.postCommentFilterBSub.value
    currCommentFilter.postId = this.reviewPost.id
    this.commentService.postCommentFilterBSub.next(currCommentFilter)
    this.commentService.findPostComment(currCommentFilter, REVIEW_POST_TYPE).subscribe(
      postComment => {
        this.postComment = postComment
        console.log(this.postComment);
        
      }
    )
  }

  onClickVote(reviewPost: ReviewPostResponse, react: -1 | 1) {
    let currUser = this.userService.userBSub.value;
    this.userReactService
      .updateReviewPostUserReact(currUser!.id, react, reviewPost.id)
      .pipe(
        tap((userReact: UserReactResponse) => {
          this.reviewPost.userReact = userReact;
        }),
        tap((_) => {
          this.postReacts$ = this.postReactService.findByReviewPostId(
            this.reviewPost.id
          );
        })
      )
      .subscribe();
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
  refetchPostUser(postUser: UserProfileResponse) {
    forkJoin([
      this.userService.findByUserId(postUser.id),
      this.followService.checkFollowPostUser(postUser.id),
    ])
      .pipe(
        tap((response) => {
          this.postUser$ = of(response[0]);
          this.isFollowed = response[1];
        })
      )
      .subscribe();
  }
  /* ADMIN */
  updateReviewPostByStatus(reviewPost: ReviewPostResponse, status: string) {
    this.reviewPostService
      .updateByStatus(reviewPost.id, status)
      .subscribe((response) => {
        reviewPost.status = response.status;
      });
  }
  openDialogEditProfile(currUser: UserProfileResponse | null) {
    this.matDialog.open(EditProfileComponent, {
      data: {
        currUser: currUser,
      },
      minWidth: '700px',
    });
  }
  /* Comment */
  commentContentCtrl: FormControl = new FormControl('')
  commentAPost(userId: number, postId: number){
    let commentRequest: CommentRequest = {
      postId: postId,
      byUserId: userId,
      content: this.commentContentCtrl.value
    }
    this.commentService.updateReviewPostComment(commentRequest)
    .subscribe(response => {
      this.postComment.comments.unshift(response)
      this.commentContentCtrl.reset()
      console.log(response);
      console.log(this.postComment);
    })
    
  }
}
