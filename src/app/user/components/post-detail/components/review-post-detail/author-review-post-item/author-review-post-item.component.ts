import { Component, Input, OnInit } from '@angular/core';
import { ReviewPostResponse, UploadFileResponse, UserProfileResponse } from 'src/app/shared/models/response';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';

@Component({
  selector: 'app-author-review-post-item',
  templateUrl: './author-review-post-item.component.html',
  styleUrls: ['./author-review-post-item.component.scss']
})
export class AuthorReviewPostItemComponent implements OnInit {
  @Input()
  authorReviewPost!: ReviewPostResponse
  postUser!: UserProfileResponse
  postCoverImage!: UploadFileResponse
  constructor(public directLinkService: DirectLinkService,) { }

  ngOnInit(): void {
    this.postUser = this.authorReviewPost.user
    this.postCoverImage = this.authorReviewPost.coverImage
  }

}
