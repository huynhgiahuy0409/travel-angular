import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from 'src/app/shared/modules';
import { JourneyPostComponent } from './journey-post.component';



@NgModule({
  declarations: [JourneyPostComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    RouterModule
  ],
  exports: [
    JourneyPostComponent
  ]
})
export class JourneyPostModule { }
