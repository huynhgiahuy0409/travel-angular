import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './user-management.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminsComponent } from './components/admins/admins.component';
import { SharedMaterialModule } from 'src/app/shared/modules';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ConfirmationComponent } from './dialogs/confirmation/confirmation.component';
import { MembersComponent } from './components/members/members.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CensorsComponent } from './components/censors/censors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleChangeDialogComponent } from './dialogs/role-change-dialog/role-change-dialog.component';


const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    children: [
      {
        path: '',
        component: MembersComponent,
      },
      {
        path: 'admins',
        component: AdminsComponent,
      },
      {
        path: 'censors',
        component: CensorsComponent,
      },
    ]
  },
];

@NgModule({
  declarations: [
    UserManagementComponent,
    AdminsComponent,
    UserProfileComponent,
    ConfirmationComponent,
    MembersComponent,
    CensorsComponent,
    RoleChangeDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMaterialModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class UserManagementModule { }
