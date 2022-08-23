import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedHeaderModule, SharedMaterialModule } from '../shared/modules';
import { CreatePostDialogComponent } from './components/home/dialog/create-post-dialog/create-post-dialog.component';
import { ImageDragDirective } from './directive/image-drag.directive';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './components/home/home.module';
import { JourneyDetailComponent } from './components/post-detail/components/journey-detail/journey-detail.component';
import { ReviewPostImageListComponent } from './components/post-detail/components/review-post-detail/review-post-image-list/review-post-image-list.component';
import { ReviewPostImageItemComponent } from './components/post-detail/components/review-post-detail/review-post-image-list/review-post-image-item/review-post-image-item.component';

@NgModule({
  declarations: [
    UserComponent,
    CreatePostDialogComponent,
    ImageDragDirective,
    JourneyDetailComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedHeaderModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule,
  ],
  providers: [
    // {
    //   provide: RECAPTCHA_SETTINGS,
    //   useValue: {
    //     siteKey: environment.recaptcha.siteKey,
    //   } as RecaptchaSettings,
    // },
  ],
})
export class UserModule {}
