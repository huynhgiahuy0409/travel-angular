import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedHeaderModule, SharedMaterialModule } from 'src/app/shared/modules';
import { AdminSharedModule } from '../../admin-shared/admin-shared.module';
import { CommercialComponent } from './components/commercial/commercial.component';
import { CommercialModule } from './components/commercial/commercial.module';
import { CommercialItemComponent } from './components/commercial/components/commercials/commercial-item/commercial-item.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostManagementComponent } from './components/post-management/post-management.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    PostManagementComponent,
    UserManagementComponent,
    StatisticComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AdminSharedModule,
    SharedHeaderModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    SharedMaterialModule,
    CommercialModule
  ],
  // exports: [
  //   CommercialItemComponent
  // ]
})
export class HomeModule { }
