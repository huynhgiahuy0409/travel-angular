import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, 
  children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {
      path: 'dashboard', component: DashboardComponent
    }
  ] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
