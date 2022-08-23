import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/operators';
import { FilterReviewPost } from 'src/app/shared/models/model';
import { ReviewPostResponse, UserProfileResponse } from 'src/app/shared/models/response';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';
import { FilterPostService } from 'src/app/user/services/filter-post.service';
import { ReviewPostService } from 'src/app/user/services/review-post.service';
import { DateUtilsService } from './../../../../services/date-utils.service';
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
  selector: 'app-review-post-detail',
  templateUrl: './review-post-detail.component.html',
  styleUrls: ['./review-post-detail.component.scss'],
  providers: [FilterPostService]
})
export class ReviewPostDetailComponent implements OnInit {
  reviewPost$!: Observable<ReviewPostResponse>;
  authorReviewPosts$!: Observable<ReviewPostResponse[]>;
  relativeReviewPosts$!: Observable<ReviewPostResponse[]>;
  @ViewChild('starsTemplateRef', { read: ElementRef, static: false })
  startsElementRef!: ElementRef;
  defaultAvatarUrl!: string
  postUser!: UserProfileResponse
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private reviewPostService: ReviewPostService,
    public directLinkService: DirectLinkService,
    public dateUtilsService: DateUtilsService,
    private filterPostService: FilterPostService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(routeParams => { 
      let reviewPostId = routeParams.id;
      if (reviewPostId) {
        this.reviewPost$ = this.reviewPostService.findById(reviewPostId).pipe(
          tap(reviewPost => {
            let reviewPostFilter: FilterReviewPost = this.filterPostService.reviewPostFilterBSub.value
            reviewPostFilter.pageable!.pageSize = 4
            this.authorReviewPosts$ = this.reviewPostService.findAll({...reviewPostFilter, postUserId: reviewPost.user.id})
            this.relativeReviewPosts$ = this.reviewPostService.findAll({...reviewPostFilter, provinceId: reviewPost.province.id})
            this.authorReviewPosts$.subscribe(v => console.log(v))
            this.relativeReviewPosts$.subscribe(v => console.log(v))
            this.postUser = reviewPost.user
            if(!reviewPost.user.avatar){
              this.defaultAvatarUrl = this.directLinkService.getDefaultAvatarURL(this.postUser.gender)
            }
          })
        );
      } else {
        this.route.navigate(['/page-not-found']);
      }
    });
  }
  onClickClose() {
    this.route.navigate(['/home/review-posts']);
  }

  @HostListener('document:keyup.escape', ['$event'])
  handleKeyboardEvent() {
    this.route.navigate(['/home/review-posts']);
  }
}
