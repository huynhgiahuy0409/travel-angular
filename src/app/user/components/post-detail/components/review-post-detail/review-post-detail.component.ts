import { switchMap } from 'rxjs/operators';
import { DateUtilsService } from './../../../../services/date-utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ReviewPostDestroyService } from '../../../home/components/review-posts/review-post-destroy.service';
import { Observable } from 'rxjs/internal/Observable';
import { ReviewPostResponse } from 'src/app/shared/models/response';
import { ReviewPostService } from 'src/app/user/services/review-post.service';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';
import { Pageable } from 'src/app/shared/models/model';
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
})
export class ReviewPostDetailComponent implements OnInit, AfterViewInit{
  reviewPostResponse$!: Observable<ReviewPostResponse>
  authorReviewPostsResponse$!: Observable<ReviewPostResponse[]>
  relativeReviewPostsResponse$!: Observable<ReviewPostResponse[]>
  @ViewChild('starsTemplateRef',{ read: ElementRef, static: false }) 
  startsElementRef!: ElementRef
 
  constructor(
    private reviewPostDestroyService: ReviewPostDestroyService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private reviewPostService: ReviewPostService,
    public directLinkService: DirectLinkService,
    public dateUtilsService: DateUtilsService,
    private cdr: ChangeDetectorRef
  ) {}
  ngAfterViewInit(): void {
    console.log(this.startsElementRef) 
    setTimeout(() => {
      console.log(this.startsElementRef) 
    }, 5000);
  }
  
  ngOnInit(): void {
    let reviewPostId = this.activatedRoute.snapshot.params.id;
    if(reviewPostId){
      this.reviewPostResponse$ = this.reviewPostService.findById(reviewPostId)
      let initPageable: Pageable ={
        pageIndex: 0,
        pageSize: 4,
        sortable: {
          dir: "DESC",
          order: "createdDate"
        }
      }
      this.authorReviewPostsResponse$ = this.reviewPostResponse$.pipe(switchMap(reviewPost => this.reviewPostService.findAllByUserIdWithPaging(reviewPost.user.id, initPageable)))
      this.authorReviewPostsResponse$.subscribe(v => console.log(v));
      this.relativeReviewPostsResponse$ = this.reviewPostResponse$.pipe(switchMap(reviewPost => this.reviewPostService.findAllByProvinceIdWithPaging(reviewPost.province.id, initPageable)))
      this.relativeReviewPostsResponse$.subscribe(v => console.log(v))
    }else{
      this.route.navigate(['/page-not-found'])
    }
    console.log(this.startsElementRef) 
  
  }
  onClickRepUser(username: string, replyInputElement: HTMLInputElement) {
    replyInputElement.value = username + ` `;
    replyInputElement.focus();
    replyInputElement.select();
  }
  onClickClose() {
    this.route.navigate(['/home/review-posts']);
  }

@HostListener('document:keyup.escape', ['$event'])
handleKeyboardEvent(event: KeyboardEvent) {
  this.route.navigate(['/home/review-posts']);
}
mouseOver(event: any){
  console.log(event);
  
}
}
