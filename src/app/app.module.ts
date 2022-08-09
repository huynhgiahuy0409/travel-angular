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
import { NgForm, FormsModule } from '@angular/forms';
import { JWTInterceptor } from './core/jwt.iterceptor';
import { CookieService } from 'ngx-cookie-service';
import { LoginModule } from './user/components/login/login.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PageNotFoundComponent } from './shared/components/pagen-not-found/page-not-found.component';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
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
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCp3qsNHBlKfgzMkrkr0FTUsNAPsH4yd7Y',
    // }),
    InfiniteScrollModule,
    QRCodeModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    CookieService,
  ],

})
export class AppModule {}
