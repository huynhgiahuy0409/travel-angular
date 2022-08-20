import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder } from '@angular/forms';
import { concatMap, debounceTime } from 'rxjs/operators';
import { ADMIN_ROLE, PENDING_STATUS } from 'src/app/shared/models/constant';
import { FilterJourneyPost, FilterReviewPost } from 'src/app/shared/models/model';
import { JourneyPostResponse, UserProfileResponse, ReviewPostResponse } from 'src/app/shared/models/response';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';
import { FilterPostService } from 'src/app/user/services/filter-post.service';
import { JourneyPostService } from 'src/app/user/services/journey-post.service';
import { ProgressBarService } from 'src/app/user/services/progress-bar.service';
import { ReviewPostService } from 'src/app/user/services/review-post.service';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-journey-posts',
  templateUrl: './journey-posts.component.html',
  styleUrls: ['./journey-posts.component.scss']
})
export class JourneyPostsComponent implements OnInit {
/* prop */
isAdmin = false
/* fg */
searchFormGroup!: FormGroup;
/* data */
journeyPosts: JourneyPostResponse[] = [];
constructor(
  private journeyPostService: JourneyPostService,
  private userService: UserService,
  private filterPostService: FilterPostService,
  public directLinkService: DirectLinkService,
  private fb: UntypedFormBuilder,
  public progressBarService: ProgressBarService  ) {
  let user: UserProfileResponse | null = this.userService.userBSub!.value
  if(user){
    this.isAdmin = user.role.name === ADMIN_ROLE ? true: false
    console.log(this.isAdmin);
    
  }
  /* init search fg */
  this.searchFormGroup = this.fb.group({
    order: this.fb.control('title'),
    search: this.fb.control(''),
  });
  let initFilterJourneyPost: FilterJourneyPost = this.filterPostService.journeyPostFilterBSub.value
  initFilterJourneyPost.status = PENDING_STATUS
  this.filterPostService.journeyPostFilter$
    .pipe(
      concatMap((filterPost) => {
        return this.journeyPostService.findAll(filterPost);
      })
    )
    .subscribe(
      (response: JourneyPostResponse[]) => {
        this.progressBarService.progressBarBSub.next(false);
        this.journeyPosts = this.journeyPosts.concat(response);
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
      this.journeyPosts = [];
      let order = this.searchFormGroup.get('order')?.value;
      let currFilter: FilterJourneyPost = this.filterPostService.journeyPostFilterBSub.value
      currFilter.pageable!.pageIndex = 0
      currFilter.title = undefined
      /* customize filter */
      if (term) {
        if (order == 'title') {
          currFilter.title = term;
        }
      }
      this.filterPostService.journeyPostFilterBSub.next(currFilter);
    });
}

ngOnInit(): void {
}
/* infinite scroll */
onScrollDown() {
  let currFilter: FilterJourneyPost =
    this.filterPostService.journeyPostFilterBSub.value;
  if(currFilter.pageable){
    let pageable = currFilter.pageable;
    pageable.pageIndex++;
    this.filterPostService.journeyPostFilterBSub.next(currFilter);
  }
}

}
