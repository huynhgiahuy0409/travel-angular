import { switchMap, concatMap, tap } from 'rxjs/operators';
import { DateUtilsService } from './../../../../services/date-utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ReviewPostDestroyService } from '../../../home/components/review-posts/review-post-destroy.service';
import { Observable } from 'rxjs/internal/Observable';
import { ReviewPostResponse } from 'src/app/shared/models/response';
import { ReviewPostService } from 'src/app/user/services/review-post.service';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';
import { FilterReviewPost, Pageable } from 'src/app/shared/models/model';
import { FilterPostService } from 'src/app/user/services/filter-post.service';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private reviewPostService: ReviewPostService,
    public directLinkService: DirectLinkService,
    public dateUtilsService: DateUtilsService,
    private filterPostService: FilterPostService
  ) {}
  ngOnInit(): void {
    let reviewPostId = this.activatedRoute.snapshot.params.id;
    if (reviewPostId) {
      this.reviewPost$ = this.reviewPostService.findById(reviewPostId).pipe(
        tap(reviewPost => {
          let reviewPostFilter: FilterReviewPost = this.filterPostService.reviewPostFilterBSub.value
          reviewPostFilter.pageable!.pageSize = 4
          this.authorReviewPosts$ = this.reviewPostService.findAll({...reviewPostFilter, postUserId: reviewPost.user.id})
          this.relativeReviewPosts$ = this.reviewPostService.findAll({...reviewPostFilter, provinceId: reviewPost.province.id})
          this.authorReviewPosts$.subscribe(v => console.log(v))
          this.relativeReviewPosts$.subscribe(v => console.log(v))
        })
      );
    } else {
      this.route.navigate(['/page-not-found']);
    }
  }
  onClickClose() {
    this.route.navigate(['/home/review-posts']);
  }

  @HostListener('document:keyup.escape', ['$event'])
  handleKeyboardEvent() {
    this.route.navigate(['/home/review-posts']);
  }
}
