import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/components/login';
import { AuthGuardService } from './user/services/auth-guard.service';
import { PageNotFoundComponent } from './shared/components/pagen-not-found/page-not-found.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ValidOTPComponent } from './components/valid-otp/valid-otp.component';
import { IdentifyComponent } from './components/identify/identify.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule), canActivate: [AuthGuardService]
  },
  { path: 'administrator', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuardService] },
  { path: 'messenger', loadChildren: () => import('./messenger/messenger.module').then(m => m.MessengerModule) },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'administrator-login',
    component: AdminLoginComponent,
  },
  {
    path: 'confirmemail', component: ValidOTPComponent
  },
  {
    path: 'recover/code', component: ValidOTPComponent
  },
  {
    path: 'recover/password', component: ForgetPasswordComponent
  },
  {
    path: 'identify',
    component: IdentifyComponent,
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
