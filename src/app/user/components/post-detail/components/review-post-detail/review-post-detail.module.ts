import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewPostDetailComponent } from './review-post-detail.component';
import { ReviewPostImageListComponent } from './review-post-image-list/review-post-image-list.component';
import { ReviewPostImageItemComponent } from './review-post-image-list/review-post-image-item/review-post-image-item.component';
import { RouterModule } from '@angular/router';
import { AuthorReviewPostItemComponent } from './author-review-post-item/author-review-post-item.component';

@NgModule({
  declarations: [
    ReviewPostDetailComponent,
    ReviewPostImageListComponent,
    ReviewPostImageItemComponent,
    AuthorReviewPostItemComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [ReviewPostImageItemComponent, ReviewPostImageListComponent],
})
export class ReviewPostDetailModule {}
