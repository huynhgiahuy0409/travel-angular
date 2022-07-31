import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/components/login';
import { AuthGuardService } from './user/services/auth-guard.service';
import { PageNotFoundComponent } from './shared/components/pagen-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule), canActivate: [AuthGuardService]
  },
  { path: 'messenger', loadChildren: () => import('./messenger/messenger.module').then(m => m.MessengerModule) },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: "**", component: PageNotFoundComponent
  },
  {
    path: "page-not-found", component: PageNotFoundComponent
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
