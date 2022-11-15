import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderImageComponent } from './slider-image/slider-image.component';



@NgModule({
  declarations: [
    SliderImageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [SliderImageComponent]
})
export class SliderImageModule { }
