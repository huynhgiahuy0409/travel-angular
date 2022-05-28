import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { SharedHeaderModule, SharedMaterialModule } from '../shared/modules';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreatePostDialogComponent } from './components/home/dialog/create-post-dialog/create-post-dialog.component';
import { ImageDragDirective } from './directive/image-drag.directive';

import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import {
  RECAPTCHA_SETTINGS,
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaSettings,
} from 'ng-recaptcha';
@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    CreatePostDialogComponent,
    ImageDragDirective,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedHeaderModule,
    SharedMaterialModule,
    AgmCoreModule,
    FormsModule,
    RecaptchaModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
})
export class UserModule {}
