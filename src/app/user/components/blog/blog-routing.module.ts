import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { FollowerComponent } from './components/follower/follower.component';
import { FollowingComponent } from './components/following/following.component';
import { JourneyPostsComponent } from './components/journey-post/journey-posts.component';
import { ReviewPostsComponent } from './components/review-post/review-posts.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: '',
        redirectTo: 'review-posts',
        pathMatch: 'full'
      },
      {
        path: 'review-posts',
        component: ReviewPostsComponent,
      },
      {
        path: 'journey-posts',
        component: JourneyPostsComponent,
      },
      {
        path: 'followers',
        component: FollowerComponent,
        pathMatch: 'full'
      },
      {
        path: 'followings',
        component: FollowingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
