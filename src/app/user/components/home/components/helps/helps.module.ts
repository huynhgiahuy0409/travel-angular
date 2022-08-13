import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpsRoutingModule } from './helps-routing.module';
import { HelpsComponent } from './helps.component';
import { ReputationComponent } from './reputation/reputation.component';
import { SharedHeaderModule } from 'src/app/shared/modules';


@NgModule({
  declarations: [
    HelpsComponent,
    ReputationComponent
  ],
  imports: [
    CommonModule,
    HelpsRoutingModule,
    SharedHeaderModule
  ]
})
export class HelpsModule { }
