import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommercialModule } from 'src/app/admin/components/home/components/commercial/commercial.module';
import {
  SharedHeaderModule,
  SharedMaterialModule
} from 'src/app/shared/modules';
import { ReviewPostDetailComponent } from '../post-detail/components/review-post-detail/review-post-detail.component';
import { ReviewPostDetailModule } from '../post-detail/components/review-post-detail/review-post-detail.module';
import { JourneyPostModule } from './components/journeys/journey-post/journey-post.module';
import { JourneysComponent } from './components/journeys/journeys.component';
import { MomoPaymentComponent } from './components/momo-payment/momo-payment.component';
import { ReviewPostModule } from './components/review-posts/review-post/review-post.module';
import { ReviewPostsComponent } from './components/review-posts/review-posts.component';
import { UserPostComponent } from './components/user-post/user-post.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({/*  */
  declarations: [
    HomeComponent,
    ReviewPostsComponent,
    JourneysComponent,
    UserPostComponent,
    MomoPaymentComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    SharedHeaderModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    InfiniteScrollModule,
    QRCodeModule,
    CommercialModule,
    ReviewPostModule,
    JourneyPostModule,
  ],
})
export class HomeModule {}
