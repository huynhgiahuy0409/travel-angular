import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommercialComponent } from './components/commercial/commercial.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostManagementComponent } from './components/post-management/post-management.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'commercial',
        loadChildren: () => import('./components/commercial/commercial.module').then(m => m.CommercialModule)
      },
      {
        path: 'post-management',
        component: PostManagementComponent,
      },
      {
        path: 'user-management',
        component: UserManagementComponent,
      },
      {
        path: 'statistic',
        component: StatisticComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
