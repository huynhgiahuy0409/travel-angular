import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreationRoutingModule } from './creation-routing.module';
import { CreationComponent } from './creation.component';
import { ReviewPostComponent } from './components/review-post/review-post.component';
import { UserPostComponent } from './components/user-post/user-post.component';
import { SharedMaterialModule } from 'src/app/shared/modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JourneyComponent } from './components/journey/journey.component';
import { RouteDetailMapDialogComponent } from './components/journey/dialog/route-detail-map-dialog/route-detail-map-dialog.component';
import { LocationDetailDialogComponent } from './components/journey/dialog/location-detail-dialog/location-detail-dialog.component';


@NgModule({
  declarations: [
    CreationComponent,
    ReviewPostComponent,
    UserPostComponent,
    JourneyComponent,
    RouteDetailMapDialogComponent,
    LocationDetailDialogComponent,
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
