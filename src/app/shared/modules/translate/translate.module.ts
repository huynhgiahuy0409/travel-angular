import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateDialogComponent } from './translate-dialog/translate-dialog.component';
import { SharedHeaderModule } from '../shared-header/shared-header.module';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TranslateDialogComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    TranslateDialogComponent,

  ]
})
export class TranslateModule { }
