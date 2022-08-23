import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './componenets/edit-profile/edit-profile.component';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateCoverImageComponent } from './componenets/update-cover-image/update-cover-image.component';
import { ChooseImageComponent } from './componenets/choose-image/choose-image.component';
import { AvatarUpdateComponent } from './componenets/avatar-update/avatar-update.component';
import { EditUsernameComponent } from './componenets/edit-profile/edit-username/edit-username.component';



@NgModule({
  declarations: [
    EditProfileComponent,
    UpdateCoverImageComponent,
    ChooseImageComponent,
    AvatarUpdateComponent,
    EditUsernameComponent
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [EditProfileComponent]
})
export class EditProfileModule { }
