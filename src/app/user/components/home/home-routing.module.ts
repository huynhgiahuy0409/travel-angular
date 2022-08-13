import { ReviewPostDetailComponent } from './../post-detail/components/review-post-detail/review-post-detail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JourneysComponent } from './components/journeys/journeys.component';
import { ReviewPostsComponent } from './components/review-posts/review-posts.component';
import { UserPostComponent } from './components/user-post/user-post.component';
import { HomeComponent } from './home.component';
import { JourneyDetailComponent } from '../post-detail/components/journey-detail/journey-detail.component';
import { MomoPaymentComponent } from './components/momo-payment/momo-payment.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {path: '', redirectTo: 'review-posts', pathMatch: 'full'},
            {
                path: 'review-posts', component: ReviewPostsComponent,
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
                path: 'journey-posts', component: JourneysComponent,
                children: [
                    {
                        path: ':id', component: JourneyDetailComponent
                    },
                ]
            },
        ],
    },
    {
        path: 'journey-post/:id/payment', component: MomoPaymentComponent
    },
    { path: 'helps', loadChildren: () => import('./components/helps/helps.module').then(m => m.HelpsModule) },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }
