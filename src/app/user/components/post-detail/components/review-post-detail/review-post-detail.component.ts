import { DateUtilsService } from './../../../../services/date-utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { ReviewPostDestroyService } from '../../../home/components/review-posts/review-post-destroy.service';
import { Observable } from 'rxjs/internal/Observable';
import { ReviewPostResponse } from 'src/app/shared/models/response';
import { ReviewPostService } from 'src/app/user/services/review-post.service';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';
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
export class ReviewPostDetailComponent implements OnInit {
  reviewPostResponse$!: Observable<ReviewPostResponse>
  constructor(
    private reviewPostDestroyService: ReviewPostDestroyService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private reviewPostService: ReviewPostService,
    public directLinkService: DirectLinkService,
    public dateUtilsService: DateUtilsService
  ) {}

  ngOnInit(): void {
    console.log(this.activatedRoute);
    let reviewPostId = this.activatedRoute.snapshot.params.id;
    if(reviewPostId){
      this.reviewPostResponse$ = this.reviewPostService.findById(reviewPostId)
      this.reviewPostResponse$.subscribe(v => console.log(v));
    }else{
      this.route.navigate(['/page-not-found'])
    }
  }
  onClickRepUser(username: string, replyInputElement: HTMLInputElement) {
    replyInputElement.value = username + ` `;
    replyInputElement.focus();
    replyInputElement.select();
  }
  onClickClose() {
    this.route.navigate(['/home/review-post']);
  }

@HostListener('document:keyup.escape', ['$event'])
handleKeyboardEvent(event: KeyboardEvent) {
  this.route.navigate(['/home/review-post']);
}
}
