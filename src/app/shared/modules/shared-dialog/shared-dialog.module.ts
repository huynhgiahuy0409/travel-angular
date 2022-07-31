import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifyDialogComponent } from './notify-dialog/notify-dialog.component';
import { SharedMaterialModule } from '../shared-material/shared-material.module';



@NgModule({
  declarations: [
    NotifyDialogComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule
  ]
})
export class SharedDialogModule { }
