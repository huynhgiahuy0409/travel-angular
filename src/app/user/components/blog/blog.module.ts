import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { FollowerComponent } from './components/follower/follower.component';
import { FollowingComponent } from './components/following/following.component';
import { SharedHeaderModule, SharedMaterialModule } from 'src/app/shared/modules';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ParticipantManagermentComponent } from './components/journey-post/dialog/participant-managerment/participant-managerment.component';
import { JourneyPostsComponent } from './components/journey-post/journey-posts.component';
import { JourneyPostModule } from '../home/components/journeys/journey-post/journey-post.module';
import { ReviewPostsComponent } from './components/review-post/review-posts.component';
import { ReviewPostModule } from '../home/components/review-posts/review-post/review-post.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProfileModule } from 'src/app/shared/modules/edit-profile/edit-profile.module';
import { ShowAvatarComponent } from './dialogs/show-avatar/show-avatar.component';
import { ShowCoverComponent } from './dialogs/show-cover/show-cover.component';

@NgModule({
  declarations: [
    BlogComponent,
    ReviewPostsComponent,
    FollowerComponent,
    FollowingComponent,
    JourneyPostsComponent,
    ParticipantManagermentComponent,
    ShowAvatarComponent,
    ShowCoverComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedHeaderModule,
    SharedMaterialModule,
    InfiniteScrollModule,
    JourneyPostModule,
    ReviewPostModule,
    FormsModule,
    ReactiveFormsModule,
    EditProfileModule
  ]
})
export class BlogModule { }
