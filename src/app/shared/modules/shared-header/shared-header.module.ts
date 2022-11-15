import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { TranslateModule } from '../translate/translate.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, SharedMaterialModule, RouterModule, TranslateModule],
  exports: [HeaderComponent],
})
export class SharedHeaderModule {}
