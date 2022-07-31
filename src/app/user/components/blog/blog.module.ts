import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { ReviewPostComponent } from './components/review-post/review-post.component';
import { FollowerComponent } from './components/follower/follower.component';
import { FollowingComponent } from './components/following/following.component';
import { SharedHeaderModule, SharedMaterialModule } from 'src/app/shared/modules';

@NgModule({
  declarations: [
    BlogComponent,
    ReviewPostComponent,
    FollowerComponent,
    FollowingComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedHeaderModule
  ]
})
export class BlogModule { }
