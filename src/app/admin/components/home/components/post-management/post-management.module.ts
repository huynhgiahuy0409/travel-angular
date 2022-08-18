import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostManagementComponent } from './post-management.component';
import { ReviewPostsComponent } from './components/review-posts/review-posts.component';
import { JourneyPostsComponent } from './components/journey-posts/journey-posts.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedMaterialModule } from 'src/app/shared/modules';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewPostComponent } from 'src/app/user/components/home/components/review-posts/review-post/review-post.component';
import { ReviewPostModule } from 'src/app/user/components/home/components/review-posts/review-post/review-post.module';

const routes: Routes = [
  {
    path: '',
    component: PostManagementComponent,
    children: [
      { path: '', redirectTo: 'review-posts', pathMatch: 'full' },
      {
        path: 'review-posts',
        component: ReviewPostsComponent,
      },
      {
        path: 'journey-posts',
        component: JourneyPostsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    ReviewPostsComponent,
    JourneyPostsComponent,
    PostManagementComponent,
  ],                        
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedMaterialModule,
    InfiniteScrollModule,
    ReviewPostModule
  ],
})
export class PostManagementModule {}
