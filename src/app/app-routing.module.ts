import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/components/login';
import { AuthGuardService } from './user/services/auth-guard.service';
import { PageNotFoundComponent } from './shared/components/pagen-not-found/page-not-found.component';
import { ForgetPasswordComponent } from './user/components/login/components/forget-password/forget-password.component';
import { IdentifyComponent } from './user/components/login/components/identify/identify.component';
import { ValidOTPComponent } from './user/components/login/components/valid-otp/valid-otp.component';

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
