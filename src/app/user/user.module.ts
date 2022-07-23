import { LoginModule } from './components/login/login.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedHeaderModule, SharedMaterialModule } from '../shared/modules';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatePostDialogComponent } from './components/home/dialog/create-post-dialog/create-post-dialog.component';
import { ImageDragDirective } from './directive/image-drag.directive';

import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { RegisterDialogComponent } from './components/login/dialog/register-dialog/register-dialog.component';
import { IdentifyComponent } from './components/identify/identify.component';
import { ReviewPostDetailComponent } from './components/review-post-detail/review-post-detail.component';
import { HomeModule } from './components/home/home.module';
@NgModule({
  declarations: [
    UserComponent,
    CreatePostDialogComponent,
    ImageDragDirective,
    RegisterDialogComponent,
    IdentifyComponent,
    ReviewPostDetailComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedHeaderModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    HomeModule
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
