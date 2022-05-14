import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ImagesLazyloadModule } from './shared/images-lazyload/images-lazyload.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from './shared/modules';
import { AgmCoreModule } from '@agm/core';
import { UserModule } from './user/user.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    UserModule,
    ImagesLazyloadModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCp3qsNHBlKfgzMkrkr0FTUsNAPsH4yd7Y',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}