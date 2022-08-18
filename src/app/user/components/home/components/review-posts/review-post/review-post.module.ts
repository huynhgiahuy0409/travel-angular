import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from 'src/app/shared/modules';
import { RouterModule } from '@angular/router';
import { ReviewPostComponent } from './review-post.component';



@NgModule({
  declarations: [ReviewPostComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    RouterModule
  ],
  exports: [
    ReviewPostComponent
  ]
})
export class ReviewPostModule { }
