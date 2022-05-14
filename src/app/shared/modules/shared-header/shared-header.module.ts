import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedMaterialModule } from '../shared-material/shared-material.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, SharedMaterialModule, RouterModule],
  exports: [HeaderComponent],
})
export class SharedHeaderModule {}
