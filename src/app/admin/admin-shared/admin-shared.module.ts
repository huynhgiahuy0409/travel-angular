import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from 'src/app/shared/modules';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedMaterialModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
  ]
})
export class AdminSharedModule { }
