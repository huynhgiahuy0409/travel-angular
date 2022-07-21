import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog.component';
import { FollowerComponent } from './components/follower/follower.component';
import { FollowingComponent } from './components/following/following.component';
import { ReviewPostComponent } from './components/review-post/review-post.component';

const routes: Routes = [
  {
    path: ':id',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: ReviewPostComponent,
      },
      {
        path: 'follower',
        component: FollowerComponent,
        pathMatch: 'full'
      },
      {
        path: 'following',
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
