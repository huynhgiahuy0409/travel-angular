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
import { IdentifyComponent } from './components/login/components/identify/identify.component';
import { HomeModule } from './components/home/home.module';
import { JourneyDetailComponent } from './components/post-detail/components/journey-detail/journey-detail.component';
import { CookieService } from 'ngx-cookie-service';

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
