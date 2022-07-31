import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedHeaderModule, SharedMaterialModule } from 'src/app/shared/modules';
import { ReviewPostsComponent } from './components/review-posts/review-posts.component';
import { UserPostComponent } from './components/user-post/user-post.component';
import { JourneysComponent } from './components/journeys/journeys.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReviewPostDetailComponent } from '../post-detail/components/review-post-detail/review-post-detail.component';



@NgModule({
    declarations: [HomeComponent, ReviewPostsComponent, UserPostComponent, JourneysComponent, ReviewPostDetailComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedMaterialModule,
        SharedHeaderModule,
        InfiniteScrollModule
    ]
})
export class HomeModule { }
