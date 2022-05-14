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
  ],
})
export class UserModule {}
