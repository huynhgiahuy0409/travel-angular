import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedHeaderModule, SharedMaterialModule } from 'src/app/shared/modules';
import { AdminSharedModule } from '../../admin-shared/admin-shared.module';
import { CommercialModule } from './components/commercial/commercial.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostManagementModule } from './components/post-management/post-management.module';
import { StatisticComponent } from './components/statistic/statistic.component';
import { StatisticModule } from './components/statistic/statistic.module';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { UserManagementModule } from './components/user-management/user-management.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
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
    CommercialModule,
    PostManagementModule,
    UserManagementModule,
    StatisticModule
  ],
})
export class HomeModule { }
