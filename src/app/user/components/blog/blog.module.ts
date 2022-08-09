import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { ReviewPostComponent } from './components/review-post/review-post.component';
import { FollowerComponent } from './components/follower/follower.component';
import { FollowingComponent } from './components/following/following.component';
import { SharedHeaderModule, SharedMaterialModule } from 'src/app/shared/modules';
import { JourneyPostComponent } from './components/journey-post/journey-post.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ParticipantManagermentComponent } from './components/journey-post/dialog/participant-managerment/participant-managerment.component';

@NgModule({
  declarations: [
    BlogComponent,
    ReviewPostComponent,
    FollowerComponent,
    FollowingComponent,
    JourneyPostComponent,
    ParticipantManagermentComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedHeaderModule,
    SharedMaterialModule,
    InfiniteScrollModule
  ]
})
export class BlogModule { }
