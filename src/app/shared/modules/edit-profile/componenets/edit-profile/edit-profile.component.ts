import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { UserProfileResponse } from 'src/app/shared/models/response';
import { DirectLinkService } from 'src/app/user/services/direct-link.service';
import { UserService } from 'src/app/user/services/user.service';
import { AvatarUpdateComponent } from '../avatar-update/avatar-update.component';
import { UpdateCoverImageComponent } from '../update-cover-image/update-cover-image.component';
import { EditUsernameComponent } from './edit-username/edit-username.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  currUser$!: Observable<UserProfileResponse | null>
  defaultAvatarURL!: string
  isAddBio: boolean =  false
  isEditUsername: boolean = false
  bioCtrl: FormControl = new FormControl('', Validators.required)
  constructor(
    public dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public directLinkService: DirectLinkService,
    private matDialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.currUser$ = this.userService.user$
  }
  addUserBio(){
    this.isAddBio = true
  }
  cancelAddUserBio(){
    this.isAddBio = false
  }
  openDialogUpdateCoverImage(){
    this.matDialog.open(UpdateCoverImageComponent, {
      width: "550px"
    })
  }
  openDialogAvatarUpdate(){
    let matDialogRef = this.matDialog.open(AvatarUpdateComponent, {
      width: "700px"
    })
    
  }
  onClickEditUsername(){
    let matDialogRef = this.matDialog.open(EditUsernameComponent, {
      width: "700px",
      data: {
        currUsername: this.userService.userBSub.value?.fullName
      }
    })
  }
  updateUserBio(bio: string, userId: number){
    this.userService.updateBio(bio, userId).subscribe(response => {
      if(response){
        this.userService.userBSub.next(response)
      }
    })
  }
}
