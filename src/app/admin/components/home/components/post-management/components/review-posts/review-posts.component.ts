import { Component, OnInit, Renderer2 } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { concatMap, debounceTime } from 'rxjs/operators';
import { CommercialPostService } from 'src/app/admin/services/commercial-post.service';
import { ADMIN_ROLE, PENDING_STATUS } from 'src/app/shared/models/constant';
import {
  FilterCommercialPost,
  FilterReviewPost,
} from 'src/app/shared/models/model';
import { ReviewPostResponse, UserProfileResponse } from 'src/app/shared/models/response';
import { ReviewPostDestroyService } from 'src/app/user/components/home/components/review-posts/review-post-destroy.service';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';
import { FilterPostService } from 'src/app/user/services/filter-post.service';
import { ProgressBarService } from 'src/app/user/services/progress-bar.service';
import { ReviewPostService } from 'src/app/user/services/review-post.service';
import { UploadFileService } from 'src/app/user/services/upload-file.service';
import { UserReactService } from 'src/app/user/services/user-react.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-review-posts',
  templateUrl: './review-posts.component.html',
  styleUrls: ['./review-posts.component.scss'],
})
export class ReviewPostsComponent implements OnInit {
  /* prop */
  isAdmin = false
  /* fg */
  searchFormGroup!: UntypedFormGroup;
  /* data */
  reviewPosts: ReviewPostResponse[] = [];
  constructor(
    private reviewPostService: ReviewPostService,
    private userService: UserService,
    private filterPostService: FilterPostService,
    public directLinkService: DirectLinkService,
    private fb: UntypedFormBuilder,
    public progressBarService: ProgressBarService  ) {
    let user: UserProfileResponse | null = this.userService.userBSub!.value
    if(user){
      this.isAdmin = user.role.name === ADMIN_ROLE ? true: false
    }
    /* init search fg */
    this.searchFormGroup = this.fb.group({
      order: this.fb.control('title'),
      search: this.fb.control(''),
    });
    let initFilterReviewPost: FilterReviewPost = this.filterPostService.reviewPostFilterBSub.value
    initFilterReviewPost.status = PENDING_STATUS
    this.filterPostService.reviewPostFilter$
      .pipe(
        concatMap((filterPost) => {
          return this.reviewPostService.findAll(filterPost);
        })
      )
      .subscribe(
        (response: ReviewPostResponse[]) => {
          this.progressBarService.progressBarBSub.next(false);
          this.reviewPosts = this.reviewPosts.concat(response);
        },
        () => {
          this.progressBarService.progressBarBSub.next(false);
        }
      );

    this.searchFormGroup
      .get('search')!
      .valueChanges.pipe(debounceTime(1000))
      .subscribe((term) => {
        this.progressBarService.progressBarBSub.next(true);
        this.reviewPosts = [];
        let order = this.searchFormGroup.get('order')?.value;
        let filter: FilterReviewPost = this.filterPostService.reviewPostFilterBSub.value
        filter.pageable!.pageIndex = 0
        filter.title = undefined
        filter.tag = undefined
        /* customize filter */
        if (term) {
          if (order == 'title') {
            filter.title = term;
          } else if (order == 'tag') {
            filter.tag = term;
          }
        }
        this.filterPostService.reviewPostFilterBSub.next(filter);
      });
  }

  ngOnInit(): void {
  }
  /* infinite scroll */
  onScrollDown() {
    let currFilter: FilterReviewPost =
      this.filterPostService.reviewPostFilterBSub.value;
    if(currFilter.pageable){
      let pageable = currFilter.pageable;
      pageable.pageIndex++;
      this.filterPostService.reviewPostFilterBSub.next(currFilter);
    }
  }
}
