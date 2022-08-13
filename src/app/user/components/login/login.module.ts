import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from 'src/app/shared/modules';
import { SharedDialogModule } from 'src/app/shared/modules/shared-dialog/shared-dialog.module';

@NgModule({
  declarations: [
    LoginComponent,
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
