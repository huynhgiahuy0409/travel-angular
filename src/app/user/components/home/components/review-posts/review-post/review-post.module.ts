import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from 'src/app/shared/modules';
import { RouterModule } from '@angular/router';
import { ReviewPostComponent } from './review-post.component';
import { ReviewPostDetailModule } from 'src/app/user/components/post-detail/components/review-post-detail/review-post-detail.module';
import { ReviewPostImageItemComponent } from 'src/app/user/components/post-detail/components/review-post-detail/review-post-image-list/review-post-image-item/review-post-image-item.component';
import { ReviewPostImageListComponent } from 'src/app/user/components/post-detail/components/review-post-detail/review-post-image-list/review-post-image-list.component';



@NgModule({
  declarations: [ReviewPostComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    RouterModule,
    ReviewPostDetailModule
  ],
  exports: [
    ReviewPostComponent,
  ]
})
export class ReviewPostModule { }
