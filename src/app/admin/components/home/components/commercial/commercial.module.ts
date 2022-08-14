import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommercialDialogComponent } from './creation/commercial-dialog/commercial-dialog.component';
import { ServicePostComponent } from './creation/service-post/service-post.component';
import { RouterModule, Routes } from '@angular/router';
import { ShopAndServiceComponent } from './components/shop-and-service/shop-and-service.component';
import { SharedMaterialModule } from 'src/app/shared/modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommercialsComponent } from './components/commercials/commercials.component';
import { CommercialComponent } from './commercial.component';
import { CommercialItemComponent } from './components/commercials/commercial-item/commercial-item.component';

const routes: Routes = [
  {
    path: '', component: CommercialComponent, children: [
      {
        path: '', redirectTo: 'commercials', pathMatch: "full"
      },
      {
        path: 'commercials', component: CommercialsComponent
      },
      {
        path: 'shop-and-service', component: ShopAndServiceComponent
      },
    ]
  }
]

@NgModule({
  declarations: [
    CommercialComponent,
    CommercialDialogComponent,
    ServicePostComponent,
    CommercialsComponent,
    CommercialItemComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  exports: [
    CommercialItemComponent
  ]
})
export class CommercialModule { }
