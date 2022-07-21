import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreationRoutingModule } from './creation-routing.module';
import { CreationComponent } from './creation.component';
import { ReviewPostComponent } from './components/review-post/review-post.component';
import { UserPostComponent } from './components/user-post/user-post.component';
import { SharedMaterialModule } from 'src/app/shared/modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreationComponent,
    ReviewPostComponent,
    UserPostComponent,
  ],
  imports: [
    CommonModule,
    CreationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
  ]
})
export class CreationModule { }
