import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterDialogComponent } from './dialog/register-dialog/register-dialog.component';
import { SharedMaterialModule } from 'src/app/shared/modules';
import { ValidOTPComponent } from './components/valid-otp/valid-otp.component';
import { IdentifyComponent } from './components/identify/identify.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { SharedDialogModule } from 'src/app/shared/modules/shared-dialog/shared-dialog.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterDialogComponent,
    ValidOTPComponent,
    IdentifyComponent,
    ForgetPasswordComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedDialogModule
  ],
})
export class LoginModule {}
