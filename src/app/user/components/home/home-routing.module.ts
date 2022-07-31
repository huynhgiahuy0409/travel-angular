import { ReviewPostDetailComponent } from './../post-detail/components/review-post-detail/review-post-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JourneysComponent } from './components/journeys/journeys.component';
import { ReviewPostsComponent } from './components/review-posts/review-posts.component';
import { UserPostComponent } from './components/user-post/user-post.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {path: '', redirectTo: 'review-post', pathMatch: 'full'},
            {
                path: 'review-post', component: ReviewPostsComponent,
                children: [
                    {
                        path: ':id', component: ReviewPostDetailComponent
                    }
                ]
            },
            {
                path: 'user-posts', component: UserPostComponent
            },
            {
                path: 'journeys', component: JourneysComponent
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }
