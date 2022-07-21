import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [{
  path: '', component: SettingsComponent, children: [
    {
      path: '', redirectTo: 'account', pathMatch: 'full'
    },
    {
      path: 'account', component: AccountComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
