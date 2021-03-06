import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JourneyComponent } from './components/journey/journey.component';
import { ReviewPostComponent } from './components/review-post/review-post.component';
import { UserPostComponent } from './components/user-post/user-post.component';
import { CreationComponent } from './creation.component';

const routes: Routes = [{ path: '', component: CreationComponent, children: [
  {
    path: 'review-post', component: ReviewPostComponent
  },
  {
    path: 'user-post', component: UserPostComponent
  },
  {
    path: 'journey', component: JourneyComponent
  }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreationRoutingModule {}
