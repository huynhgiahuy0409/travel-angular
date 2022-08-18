import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  searchFormGroup!: FormGroup;
  /* data */
  reviewPosts: ReviewPostResponse[] = [];
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
    private commercialPostService: CommercialPostService
  ) {
    let user: UserProfileResponse | null = this.userService.userBSub!.value
    if(user){
      this.isAdmin = user.role.name === ADMIN_ROLE ? true: false
    }
    /* init search fg */
    this.searchFormGroup = this.fb.group({
      order: this.fb.control('title'),
      search: this.fb.control(''),
    });
    let initFilterCommercialPost: FilterCommercialPost = {
      pageable: {
        pageIndex: 0,
        pageSize: 2,
        sortable: {
          order: 'createdDate',
          dir: 'DESC',
        },
      },
    };
    let initFilterReviewPost: FilterReviewPost = this.filterPostService.filterPostBSub.value
    initFilterReviewPost.status = PENDING_STATUS
    this.filterPostService.filterPostBSub.next(initFilterReviewPost)
    this.filterPostService.filterPost$
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
        (error) => {
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
        let filter: FilterReviewPost = {
          pageable: {
            pageIndex: 0,
            pageSize: 1,
            sortable: {
              dir: 'DESC',
              order: 'createdDate',
            },
          },
        };
        /* customize filter */
        if (term) {
          if (order == 'title') {
            filter.title = term;
          } else if (order == 'tag') {
            filter.tag = term;
          } else if (order == 'cost') {
            filter.cost = term;
          } else if (order == 'provinceName') {
            filter.provinceName = term;
          }
        }
        this.filterPostService.filterPostBSub.next(filter);
      });
  }

  ngOnInit(): void {
  }
  /* infinite scroll */
  onScrollDown($event: any) {
    let currFilter: FilterReviewPost =
      this.filterPostService.filterPostBSub.value;
    let pageable = currFilter.pageable;
    pageable.pageIndex++;
    this.filterPostService.filterPostBSub.next(currFilter);
  }
}
