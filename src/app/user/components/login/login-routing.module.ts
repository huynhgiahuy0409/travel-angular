import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgetPasswordComponent } from "./components/forget-password/forget-password.component";
import { IdentifyComponent } from "./components/identify/identify.component";
import { ValidOTPComponent } from "./components/valid-otp/valid-otp.component";
import { LoginComponent } from "./login.component";

const routes: Routes = [
  {
    path: '', component: LoginComponent
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
    path: 'login/identify',
    component: IdentifyComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
