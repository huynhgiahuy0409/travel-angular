import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ImagesLazyloadModule } from './shared/images-lazyload/images-lazyload.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from './shared/modules';
import { UserModule } from './user/user.module';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JWTInterceptor } from './core/jwt.iterceptor';
import { CookieService } from 'ngx-cookie-service';
import { LoginModule } from './user/components/login/login.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PageNotFoundComponent } from './shared/components/pagen-not-found/page-not-found.component';
import { QRCodeModule } from 'angularx-qrcode';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { IdentifyComponent } from './components/identify/identify.component';
import { ValidOTPComponent } from './components/valid-otp/valid-otp.component';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AdminLoginComponent,
    ForgetPasswordComponent,
    IdentifyComponent,
    ValidOTPComponent,
    RegisterDialogComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    UserModule,
    ImagesLazyloadModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    FormsModule,
    LoginModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule,
    QRCodeModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    CookieService,
  ],
})
export class AppModule {}
